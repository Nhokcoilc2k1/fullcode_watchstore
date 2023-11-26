import classNames from 'classnames/bind';
import styles from './IntroduceInfoProduct.module.scss';

const cx = classNames.bind(styles);

function WarrantyPolicy() {
    return (
        <div className={cx('Warr-policy')}>
            <p>
                Đồng hồ chính hãng khác với đồng hồ Fake ở chỗ là nó luôn đi kèm với 1 chiếc THẺ hoặc 1 SỔ BẢO HÀNH toàn
                cầu có giá trị bảo hành theo từng thời gian quy định của từng hãng.
            </p>
            <p>
                THẺ hoặc SỔ BẢO HÀNH chính thức này được WatchStore ghi đầy đủ và chính xác các thông tin của đồng hồ
                như: mã đồng hồ, nơi bán, ngày mua hàng.
            </p>
            <p>Thời gian bảo hành được tính từ ngày mua hàng được ghi trên THẺ hoặc SỔ BẢO HÀNH.</p>
            <h5>DUY NHẤT TẠI WATCHSTORE</h5>
            <p>
                1: Bạn sẽ được <strong>bảo hành trọn gói 5 năm</strong> tính từ ngày mua tại WatchStore, (đã bao gồm cả
                thời gian bảo hành quốc tế của từng hãng).
            </p>
            <p>
                2: WatchStore.vn sẽ không có bất cứ quy định khắt khe và không thu bất cứ khoản phí nào trong suốt 5 năm
                bảo hành, đồng hồ của bạn có bất cứ lỗi nào từ nhà sản xuất bạn mang qua sẽ được bảo hành.
            </p>
            <h5>ĐIỀU KIỆN BẢO HÀNH</h5>
            <p>
                1: WatchStore.vn sẽ chỉ bảo hành miễn phí cho các lỗi của nhà sản xuất như: hư hỏng các linh kiện bên
                trong của đồng hồ, có thể được đổi sang 1 chiếc đồng hồ mới (trong vòng 7 ngày tính từ ngày nhận hàng)
                tuỳ theo mức độ hỏng hóc của linh kiện.
            </p>
            <p>
                2: Ngoài ra Pin của đồng hồ bạn mua tại hệ thống của WatchStore.vn sẽ được thay thế miễn phí và lau dầu
                cũng miễn phí trong suốt thời gian bảo hành (không áp dụng pin năng lượng từ ánh sáng (Eco-Drive), loại
                pin này sẽ áp dụng theo các chính sách bảo hành kèm theo của hãng). Riêng đồng hồ Casio sẽ được miễn phí
                thay pin trọn đời.
            </p>
            <p>
                3: WatchStore.vn chỉ chấp nhận bảo hành khi bạn còn giữ THẺ hoặc SỔ BẢO HÀNH liên quan tới chiếc đồng hồ
                của bạn.
            </p>
            <h5>KHÔNG BẢO HÀNH</h5>
            <p>
                1. Không bảo hành dây, vỏ vì các bộ phận bên ngoài này sẽ bị hao mòn và lão hoá theo thời gian ví dụ
                như: vỏ máy bị móp méo do va đập, bị trầy xước, phai màu, bong tróc, nứt vỡ, hỏng khoá dây.
            </p>
            <p>
                2. Không bảo hành cho những hậu quả gián tiếp của việc sử dụng không đúng cách của người sử dụng như:
                đeo đồng hồ trong khi xông hơi, tắm nước nóng, để đồng hồ tiếp xúc với các loại hóa chất, axít, chất tẩy
                rửa có độ ăn mòn cao…
            </p>
            <p>
                3. Không bảo hành cho những đồng hồ đã bị sửa chữa tại những nơi không phải là trung tâm bảo hành được
                các hãng đồng hồ ủy quyền chính thức hoặc tại WatchStore.vn, đặc biệt trường hợp kháchh tự sửa chữa sẽ
                từ chối bảo hành ngay lập tức.
            </p>
            <p>
                4. Không bảo hành cho đồng hồ bị hư hỏng do ảnh hưởng của thiên tai, hỏa hoạn, lũ lụt, tai nạn hoặc cố
                tình gây hư hỏng.
            </p>
        </div>
    );
}

export default WarrantyPolicy;
