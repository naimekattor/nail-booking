import Image from "next/image";
import Link from "next/link";
// Google Play Button Component
const GooglePlayButton = () => {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=your.app.id"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        backgroundColor: "#000000",
        color: "#ffffff",
        textDecoration: "none",
        borderRadius: "4px",
        padding: "12px 16px",
        fontFamily: "Roboto, Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "1.2",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        marginRight: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Simplified Play Icon SVG */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#00C853"
          style={{ marginRight: "8px" }}
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        <div>
          <div
            style={{ fontSize: "10px", fontWeight: "500", marginBottom: "2px" }}
          >
            GET IT ON
          </div>
          <div style={{ fontSize: "12px", fontWeight: "700" }}>Google Play</div>
        </div>
      </div>
    </a>
  );
};

// App Store Button Component
const AppStoreButton = () => {
  return (
    <a
      href="https://apps.apple.com/app/id123456789"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        backgroundColor: "#000000",
        color: "#ffffff",
        textDecoration: "none",
        borderRadius: "4px",
        padding: "12px 16px",
        fontFamily:
          "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: "17px",
        lineHeight: "1.2",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        fontWeight: "600",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Simplified Apple Icon SVG */}
        <svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="#ffffff"
          style={{ marginRight: "8px" }}
        >
          <path d="M15.5 5.625c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm-3.5 10.625c0 2.485-2.239 4.5-5 4.5s-5-2.015-5-4.5c0-1.407.663-2.624 1.697-3.5-.143-.403-.23-.83-.23-1.275 0-2.21 1.791-4 4-4 .27 0 .533.032.783.09.28-.54.617-.99 1-.99.345 0 .653.18.827.45.17.27.212.61.117.922.688-.137 1.482-.21 2.273-.21 2.209 0 4 1.79 4 4 0 .445-.087.872-.23 1.275.983.787 1.697 2.002 1.697 3.5z" />
        </svg>
        <div>Download on the App Store</div>
      </div>
    </a>
  );
};
export function AppDownload() {
  return (
    <section className="container py-20 md:py-28 ">
      <div className="text-center max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Run your daily operations in the app
          </h2>
          <p className="text-lg text-muted-foreground">
            Download our mobile app for on-the-go management
          </p>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full md:w-auto">
          {/* Google Play Button */}
          <Link
            target="_blank"
            href="https://play.google.com/"
            className="w-full sm:w-auto bg-[#191919]  transition-colors duration-200 rounded-lg px-4 py-2 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 h-16"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 34"
              className="w-7 h-8 sm:w-8 sm:h-9 md:w-9 md:h-10"
              fill="none"
            >
              <path
                d="M13.9255 16.2463L0.324219 31.0082C0.325496 31.0108 0.325496 31.0148 0.326774 31.0174C0.744509 32.6203 2.17528 33.7999 3.87433 33.7999C4.55395 33.7999 5.19141 33.6118 5.73817 33.2826L5.7816 33.2565L21.0909 24.223L13.9255 16.2463Z"
                fill="#EA4335"
              />
              <path
                d="M27.686 13.7326L27.6733 13.7235L21.0636 9.80568L13.6172 16.5818L21.0904 24.2214L27.6643 20.3428C28.8166 19.7053 29.5997 18.463 29.5997 17.0312C29.5997 15.6073 28.8281 14.3714 27.686 13.7326Z"
                fill="#FBBC04"
              />
              <path
                d="M0.324412 2.99053C0.242653 3.29883 0.199219 3.62281 0.199219 3.95724V30.0428C0.199219 30.3772 0.242653 30.7012 0.325689 31.0082L14.3933 16.6238L0.324412 2.99053Z"
                fill="#4285F4"
              />
              <path
                d="M14.0264 16.9999L21.0653 9.8031L5.77394 0.736914C5.21823 0.395952 4.56928 0.199999 3.87561 0.199999C2.17656 0.199999 0.743231 1.38226 0.325496 2.98648C0.325496 2.98778 0.324219 2.98909 0.324219 2.9904L14.0264 16.9999Z"
                fill="#34A853"
              />
            </svg>
            <div className="flex flex-col items-start text-white leading-tight">
              <span className="text-[10px] uppercase">Download on</span>
              <span className="text-[12px] md:text-[16px] font-medium">
                Google Play
              </span>
            </div>
          </Link>

          {/* Apple Store Button */}
          <Link
            target="_blank"
            href="https://apps.apple.com/"
            className="w-full sm:w-auto bg-[#191919]  transition-colors duration-200 rounded-lg px-4 py-2 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 h-16"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29 35"
              className="w-7 h-8 sm:w-8 sm:h-9 md:w-9 md:h-10"
              fill="white"
            >
              <path d="M23.5855 18.4894C23.6025 17.2016 23.9529 15.9388 24.6041 14.8187C25.2553 13.6986 26.1861 12.7574 27.3099 12.0829C26.596 11.0874 25.6541 10.2682 24.5592 9.69026C23.4642 9.11233 22.2463 8.79163 21.0021 8.75363C18.3482 8.48165 15.7753 10.3041 14.4229 10.3041C13.0443 10.3041 10.9621 8.78063 8.71984 8.82566C7.26951 8.87141 5.85605 9.28316 4.61717 10.0208C3.3783 10.7584 2.35626 11.7968 1.65065 13.0347C-1.40586 18.2013 0.874026 25.7944 3.80195 29.9707C5.26687 32.0157 6.97892 34.3 9.21913 34.219C11.4113 34.1302 12.23 32.8542 14.8762 32.8542C17.4977 32.8542 18.2659 34.219 20.5515 34.1675C22.9039 34.1302 24.3859 32.1134 25.7994 30.049C26.852 28.5919 27.6619 26.9814 28.1992 25.2773C26.8326 24.713 25.6663 23.7684 24.8459 22.5613C24.0255 21.3543 23.5871 19.9381 23.5855 18.4894Z" />
              <path d="M19.2677 6.00708C20.5503 4.50389 21.1822 2.57179 21.0292 0.621094C19.0697 0.822021 17.2597 1.73633 15.9598 3.18184C15.3242 3.88801 14.8374 4.70955 14.5273 5.5995C14.2171 6.48945 14.0897 7.43035 14.1522 8.36842C15.1323 8.37827 16.1019 8.17087 16.988 7.76185C17.8741 7.35282 18.6535 6.75284 19.2677 6.00708Z" />
            </svg>
            <div className="flex flex-col items-start text-white leading-tight">
              <span className="text-[10px] uppercase">Download on</span>
              <span className="text-[12px] md:text-[16px] font-medium">
                App Store
              </span>
            </div>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          Web is for billing, affiliate, and team management.
        </p>
      </div>
    </section>
  );
}
