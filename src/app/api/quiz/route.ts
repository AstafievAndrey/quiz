// export async function POST() {
//   return { data: [1, 2, 3] };
// }

import { NextResponse } from "next/server";

// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  return NextResponse.json({ message: "Hello World" });
}
