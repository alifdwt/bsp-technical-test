export const translateRouteToIndonesian = (route: string) => {
  const formattedRoute = route.replaceAll("-", " ");

  switch (formattedRoute) {
    case "home":
      return "Beranda";
    case "dashboard":
      return "Dasbor";
    case "profile":
      return "Profil";
    case "settings":
      return "Pengaturan";
    case "quotation":
      return "Penawaran Asuransi";
    case "insurance application":
      return "Permohonan Asuransi";
    case "create insurance application":
      return "Buat Permohonan Asuransi";
    case "transaction list":
      return "Daftar Transaksi";
    case "print card":
      return "Cetak Kartu";
    case "policy":
      return "Polis";
    case "master data":
      return "Data Master";
    case "building type":
      return "Jenis Bangunan";
    case "invoice":
      return "Faktur";
    case "product":
      return "Produk";
    case "fire":
      return "Kebakaran";

    case "add":
      return "Tambah";
    case "create":
      return "Buat";

    default:
      return formattedRoute;
  }
};
