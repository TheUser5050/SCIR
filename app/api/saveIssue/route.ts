export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    console.log(body)
  } catch (err) {
    console.log(err)
  }
  return Response.json({ message: "The message reached" })
}
