"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Live HH:MM in the site's time zone. Renders a stable placeholder on the server. */
export function LocalTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.timeZone });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className="latin" suppressHydrationWarning>
      {time}
    </time>
  );
}
