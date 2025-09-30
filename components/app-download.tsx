import Image from "next/image";

export function AppDownload() {
  return (
    <section className="container py-20 md:py-28 bg-muted/30">
      <div className="text-center max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Run your daily operations in the app
          </h2>
          <p className="text-lg text-muted-foreground">
            Download our mobile app for on-the-go management
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="inline-block">
            <Image
              src="/google-play-store-download-button.jpg"
              alt="Get it on Google Play"
              width={180}
              height={60}
              className="h-14 w-auto"
            />
          </a>
          <a href="#" className="inline-block">
            <Image
              src="/apple-app-store-download-button.jpg"
              alt="Download on the App Store"
              width={180}
              height={60}
              className="h-14 w-auto"
            />
          </a>
        </div>

        <p className="text-sm text-muted-foreground">
          Web is for billing, affiliate, and team management.
        </p>
      </div>
    </section>
  );
}
