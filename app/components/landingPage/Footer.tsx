import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="text-center py-4 text-base text-muted-foreground">
      <p>
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/TheMercury1229"
          target="_blank"
          className="text-primary font-semibold"
        >
          Mercury
        </Link>
      </p>
    </footer>
  );
};
