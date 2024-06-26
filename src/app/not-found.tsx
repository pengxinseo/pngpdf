export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <section>
          <div className="px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-6xl">404 Page not found</h1>
              <p className="mx-auto mb-5 max-w-lg text-sm text-[#636262] sm:text-base md:mb-6 lg:mb-8">Sorry, we couldn’t find the page you’re looking for.</p>
              <a href="/" className="inline-block items-center bg-black px-8 py-4 text-center font-semibold text-white">Back Home</a>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
