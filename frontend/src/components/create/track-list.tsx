"use client";

import { Loader2, RefreshCcw, Search, XCircle } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

export interface Track {
  id: string;
  title: string;
  createdAt: Date;
  instrumental: boolean;
  prompt: string | null;
  lyrics: string | null;
  fullDescribedSong: string | null;
  describedLyrics: string | null;
  thumbnailUrl: string | null;
  playUrl: string | null;
  status: string | null;
  createdByUserName: string | null;
  published: boolean;
}

export function TrackList({ tracks }: { tracks: Track[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredTracks = tracks.filter(
    (track) =>
      track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.prompt?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="flex flex-1 flex-col overflow-y-scroll">
      <div className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search tracks..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            onClick={() => {}}
          >
            {isRefreshing ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <RefreshCcw />
            )}
            Refresh
          </Button>
        </div>
        {/* Track List */}
        <div className="space-y-2">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => {
              switch (track.status) {
                case "failed":
                  return (
                    <div
                      key={track.id}
                      className="flex cursor-not-allowed items-center gap-4 rounded-lg p-3"
                    >
                      <div className="bg-destructive/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md">
                        <XCircle className="text-destructive h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-destructive truncate text-sm font-medium">
                          Generation failed
                        </h3>
                        <p className="text-muted-foreground truncate text-xs">
                          Please try creating the song again.
                        </p>
                      </div>
                    </div>
                  );

                case "no credits":
                  return (
                    <div
                      key={track.id}
                      className="flex cursor-not-allowed items-center gap-4 rounded-lg p-3"
                    >
                      <div className="bg-destructive/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md">
                        <XCircle className="text-destructive h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-destructive truncate text-sm font-medium">
                          Not enough credits
                        </h3>
                        <p className="text-muted-foreground truncate text-xs">
                          Please purchase more credits to generate this song.
                        </p>
                      </div>
                    </div>
                  );

                case "processing":
                case "queued":
                  return (
                    <div
                      key={track.id}
                      className="flex cursor-not-allowed items-center gap-4 rounded-lg p-3"
                    >
                      <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md">
                        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-muted-foreground truncate text-sm font-medium">
                          Processing song...
                        </h3>
                        <p className="text-muted-foreground truncate text-xs">
                          Refresh to check the status.
                        </p>
                      </div>
                    </div>
                  );
              }
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
