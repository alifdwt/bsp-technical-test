import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-center bg-primary-50 bg-dotted-pattern min-h-screen w-full bg-cover bg-fixed bg-center">
      <section className="min-w-full rounded-[10px] bg-white px-4 py-10 shadow-2xl sm:min-w-[520px] sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h2 className="text-[24px] font-bold leading-[31.2px] text-gray-900">
              Bergabunglah
            </h2>
            <p className="text-[16px] font-normal leading-[22.4px] text-gray-600">
              Untuk menggunakan fitur-fitur Payung Proteksi
            </p>
          </div>

          <Image
            src={"/assets/images/logo.svg"}
            alt="Payung Proteksi Logo"
            width={50}
            height={50}
          />
        </div>
        {children}
      </section>
    </main>
  );
}
