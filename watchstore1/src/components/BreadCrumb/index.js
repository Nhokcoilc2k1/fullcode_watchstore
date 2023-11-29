import classNames from 'classnames/bind';
import styles from './BreadCrumb.module.scss';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BreadCrumb({routes}) {
    
    const breadcrumb = useBreadcrumbs(routes);
    return ( 
        <div className={cx('wrapper')}>
            <nav className={cx('box')}>
            {breadcrumb?.filter(el => !el.match.route === false ).map(({ match, breadcrumb }, index, self) => (
              <Link className={cx('btn-breadcrumb')} key={match.pathname} to={match.pathname}>
                <span>{breadcrumb}</span>
                {index !== self.length - 1 &&  <span className={cx('separate')}>/</span>}
              </Link>
            ))}
            </nav>
        </div>
     );
}

export default BreadCrumb;