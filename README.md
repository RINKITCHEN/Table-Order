# Table Order MVP

ระบบสั่งอาหารผ่าน QR แบบทดลอง

## วิธีลอง
1. เปิด `index.html` ใน browser
2. เลือกโหมดลูกค้า หรือร้าน
3. ลูกค้าเลือกโต๊ะและเมนู แล้วส่งออเดอร์
4. ร้านเปิดหน้า Dashboard เพื่อดูออเดอร์

> รุ่นนี้เป็น prototype แบบไม่ใช้ server: ข้อมูลเก็บใน localStorage ของ browser เครื่องเดียว
> สำหรับใช้งานจริงหลายมือถือ ต้องต่อ backend/database + realtime service

## ไฟล์
- `index.html` — หน้าแอปทั้งหมด
- `app.js` — logic เมนู/ตะกร้า/ออเดอร์
- `style.css` — หน้าตา
