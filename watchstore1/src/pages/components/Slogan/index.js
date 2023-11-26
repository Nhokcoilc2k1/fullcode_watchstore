import classNames from 'classnames/bind';
import styles from './Slogan.module.scss';
import slogans from '~/assets/data/Slogan';

const cx = classNames.bind(styles);

function Slogan() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                {slogans.map((item) => (
                    <div key={item.id} className={cx('col', 'l-3', 'm-6', 'c-12')}>
                        <div className={cx('slogan')}>
                            <div className={cx('img')}>
                                <img src={item.url} alt="anh" />
                            </div>
                            <div className={cx('text')}>
                                <h4 className={cx('name')}>{item.name}</h4>
                                <p className={cx('desc')}>{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slogan;
