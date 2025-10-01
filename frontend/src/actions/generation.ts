"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { inngest } from "~/inngest/client";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export default async function queueSong() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  const song = db.song.create({
    data: {
      userId: session.user.id,
      title: "Untitled",
      fullDescribedSong: "Hip Hop Song",
    },
  });

  await inngest.send({
    name: "generate-song-event",
    data: {
      songId: (await song).id,
      userId: session.user.id,
    },
  });
}
