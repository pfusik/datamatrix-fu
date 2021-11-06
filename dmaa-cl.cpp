/*
 * dmaa-cl.cpp - Data Matrix ASCII Art encoder using OpenCL
 *
 * Copyright (C) 2021  Piotr Fusik
 *
 * This file is part of DataMatrix.ci, see http://github.com/pfusik/datamatrix-ci
 *
 * DataMatrix.ci is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DataMatrix.ci is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DataMatrix.ci.  If not, see http://www.gnu.org/licenses/
 */

#include <stdio.h>
#include <stdlib.h>

#define CL_TARGET_OPENCL_VERSION 200
#include <CL/cl.h>

#include "datamatrix.h" // DataMatrixEncoder_MAX_MESSAGE_LENGTH, DataMatrixEncoder_MAX_ROWS, DataMatrixEncoder_MAX_COLUMNS

static void check_error(cl_int err)
{
	if (err != CL_SUCCESS) {
		fprintf(stderr, "OpenCL error %d\n", err);
		exit(1);
	}
}

int main()
{
	cl_platform_id platform;
	cl_uint num;
	check_error(clGetPlatformIDs(1, &platform, &num));
	if (num == 0) {
		fprintf(stderr, "No OpenCL platforms\n");
		return 1;
	}

	cl_device_id device;
	check_error(clGetDeviceIDs(platform, CL_DEVICE_TYPE_DEFAULT, 1, &device, &num));
	if (num == 0) {
		fprintf(stderr, "No OpenCL device\n");
		return 1;
	}

	size_t size;
	check_error(clGetDeviceInfo(device, CL_DEVICE_NAME, 0, nullptr, &size));
	char *name = static_cast<char *>(malloc(size));
	check_error(clGetDeviceInfo(device, CL_DEVICE_NAME, size, name, nullptr));
	fprintf(stderr, "Running on %s\n", name);
	free(name);

	const cl_context_properties properties[] = {
		CL_CONTEXT_PLATFORM, (cl_context_properties) platform, 0
	};
	cl_int err;
	cl_context context = clCreateContext(properties, 1, &device, nullptr, nullptr, &err);
	check_error(err);

	const char *source =
#include "datamatrix-cl.h"
		;
	cl_program program = clCreateProgramWithSource(context, 1, &source, nullptr, &err);
	check_error(err);

	check_error(clBuildProgram(program, 1, &device, "-cl-std=CL2.0", nullptr, nullptr));

	cl_kernel kernel;
	check_error(clCreateKernelsInProgram(program, 1, &kernel, nullptr));

	char message[DataMatrixEncoder_MAX_MESSAGE_LENGTH];
	size_t messageLength = fread(message, 1, sizeof(message) - 1, stdin);
	message[messageLength] = '\0';

	cl_mem messageBuffer = clCreateBuffer(context, CL_MEM_READ_ONLY | CL_MEM_COPY_HOST_PTR | CL_MEM_HOST_NO_ACCESS, messageLength + 1, message, &err);
	check_error(err);
	check_error(clSetKernelArg(kernel, 0, sizeof(messageBuffer), &messageBuffer));

	char result[DataMatrixEncoder_MAX_ROWS * (DataMatrixEncoder_MAX_COLUMNS + 1) + 1];
	cl_mem resultBuffer = clCreateBuffer(context, CL_MEM_WRITE_ONLY | CL_MEM_HOST_READ_ONLY, sizeof(result), nullptr, &err);
	check_error(err);
	check_error(clSetKernelArg(kernel, 1, sizeof(resultBuffer), &resultBuffer));

	cl_command_queue queue = clCreateCommandQueueWithProperties(context, device, nullptr, &err);
	check_error(err);

	const size_t one = 1;
	check_error(clEnqueueNDRangeKernel(queue, kernel, 1, nullptr, &one, nullptr, 0, nullptr, nullptr));

	check_error(clEnqueueReadBuffer(queue, resultBuffer, false, 0, sizeof(result), result, 0, nullptr, nullptr));

	check_error(clFinish(queue));

	check_error(clReleaseCommandQueue(queue));
	check_error(clReleaseMemObject(resultBuffer));
	check_error(clReleaseMemObject(messageBuffer));
	check_error(clReleaseKernel(kernel));
	check_error(clReleaseProgram(program));
	check_error(clReleaseContext(context));

	fputs(result, stdout);
	return 0;
}
