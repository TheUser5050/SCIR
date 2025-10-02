import { NextResponse } from "next/server";
import { pool } from "../../lib/db"

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    console.log(body)
    const {
      title,
      category,
      description,
      latitude,
      longitude,
      image_url // The URL returned from the cloud image upload
    } = body;

    // Basic input validation: ensure core fields exist
    if (!title || !category || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { message: 'Missing required report fields (title, category, or location).' },
        { status: 400 } // Bad Request
      );
    }
    const insertQuery = `
        INSERT INTO issues (
            title, category, description, image_url, 
            geom, created_at
        )
        VALUES (
            $1, $2, $3, $4, 
            ST_SetSRID(ST_MakePoint($5, $6), 4326), -- PostGIS function for Geo Point
            NOW()
        )
        RETURNING issue_id;
    `;

    // 3. Create the array of values (parameters)
    const values = [
      title,
      category,
      description,
      image_url,
      longitude, // $5 (ST_MakePoint expects Longitude first)
      latitude   // $6
    ];

    // 4. FIX: Execute the query using the imported 'pool' object
    // pool.query() handles getting a client, running the query, and releasing the client automatically.
    const result = await pool.query(insertQuery, values);

  } catch (err) {
    console.log(err)
  }
  return Response.json({ message: "The message reached" })
}
