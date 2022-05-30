class chuyenTau {
  maSo;
  soNguoiMuaVe = 0;
  soVeConLai = 100;
  giaVe = 50;
  tongSoTienThuDuoc = 0;

  thongTin() {
    return `Ma So: ${maSo} ...`;
  }
}

class khachHang {
  ten;
  diaChi;
  gioiTinh;

  thongTin() {
    return `Ten: ${ten} ...`;
  }
  muaVe(soLuong) {
    chuyenTau.soNguoiMuaVe = chuyenTau.soNguoiMuaVe + soLuong;
    chuyenTau.soVeConLai = chuyenTau.soVeConLai - soLuong;
    chuyenTau.tongSoTienThuDuoc =
      chuyenTau.tongSoTienThuDuoc + chuyenTau.giaVe * 50;
  }
}
