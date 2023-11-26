import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <h4>Liên hệ</h4>
            <div className={cx('gg-map')}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.4614042054905!2d105.84321574526108!3d21.004017143540658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac7693d9417f%3A0x3646d830d80f6b29!2zOTcgUC4gVHLhuqduIMSQ4bqhaSBOZ2jEqWEsIELDoWNoIEtob2EsIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1695353793096!5m2!1svi!2s"
                    // allowfullscreen=""
                    // loading="lazy"
                    // referrerpolicy="no-referrer-when-downgrade"
                    className={cx('map')}
                ></iframe>
            </div>
            <div className={cx('row')}>
                <div className={cx('col', 'l-6')}>
                    <h5 className={cx('title')}>Chúng tôi trân trọng ý kiến của quý khách</h5>
                    <p className={cx('sub-title')}>Nếu bạn có gì thắc mắc hãy liên hệ với chúng tôi qua địa chỉ</p>
                    <div className={cx('info')}>
                        <p className={cx('name')}>Điện thoại</p>
                        <p className={cx('content')}>1900.27.27.30</p>
                    </div>
                    <div className={cx('info')}>
                        <p className={cx('name')}>Điạ chỉ</p>
                        <p>97 Trần Đại Nghĩa, P.Bách Khoa, HBT, Hà Nội</p>
                    </div>
                    <div className={cx('info')}>
                        <p className={cx('name')}>Email</p>
                        <p className={cx('content')}>30shinestore@30shine.com</p>
                    </div>
                    <div className={cx('info')}>
                        <p className={cx('name')}>Thời gian</p>
                        <p className={cx('content')}>Tất cả các ngày trong tuần</p>
                    </div>
                    <div className={cx('info')}>
                        <p className={cx('name')}>Mạng xã hội</p>
                        <p>
                            <a href="/">
                                <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
                            </a>
                            <a href="/">
                                <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
                            </a>
                        </p>
                    </div>
                </div>
                <div className={cx('col', 'l-6')}>
                    <h5 className={cx('title')}>Gửi thắc mắc cho chúng tôi</h5>
                    <p className={cx('sub-title')}>
                        Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn
                        sớm nhất có thể
                    </p>
                    <div className={cx('info')}>
                        <p className={cx('name')}>Nội dung liên hệ</p>
                        <textarea placeholder="Nhập nội dung liên hệ" />
                        <span></span>
                    </div>
                    <div className={cx('control')}>
                        <Button primary className={cx('submit')}>Gửi thông tin</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
