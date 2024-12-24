export default function ({ store, redirect }) {
  // ตรวจสอบว่าผู้ใช้งานมีข้อมูล admin หรือไม่
  if (!store.state.admin) {
    // ถ้าไม่มีข้อมูล admin ให้ redirect ไปหน้า login
    return redirect('/admin')
  }
}
