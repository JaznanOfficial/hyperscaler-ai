import { NextResponse } from "next/server";
import { z } from "zod";

export class ApiResponse {
  static success(data: any, status = 200) {
    return NextResponse.json(data, { status });
  }

  static error(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
  }

  static unauthorized(message = "Unauthorized") {
    return NextResponse.json({ error: message }, { status: 401 });
  }

  static forbidden(message = "Forbidden") {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  static badRequest(message: string) {
    return NextResponse.json({ error: message }, { status: 400 });
  }

  static validationError(error: z.ZodError) {
    return NextResponse.json(
      {
        error: "Invalid request data",
        details: error.issues,
      },
      { status: 400 }
    );
  }
}
