export default function ({ store, redirect }) {
    // ตรวจสอบสถานะการล็อกอินของผู้ใช้
    if (!store.state.auth.loggedIn) {
        return redirect('/login') // ถ้ายังไม่ล็อกอิน ให้ redirect ไปยังหน้า login
    }
}