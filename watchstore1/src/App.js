import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, adminRoutes } from './routes';
import { DefaultLayout } from './Layout';
import { Fragment, useEffect } from 'react';
import LayoutAdmin from './Layout/LayoutAdmin';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetail from './pages/OderDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from './Redux/app/asyncActions';
import { getBrands } from './Redux/brand/asyncActions';

function App() {
    const { current } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getBrands());
    },[])
   
    // const token = window.localStorage.getItem("userInfo");
    return (
        <Router>
            <div className="App">
                <Routes>
                    {current?.roles !== 'admin' ? (
                        <>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;

                                let Layout = DefaultLayout;

                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </>                            
                    ) : (
                        <>
                            {adminRoutes.map((route, index) => {
                                const Page = route.component;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <LayoutAdmin>
                                                <Page />
                                            </LayoutAdmin>
                                        }
                                    />
                                );
                            })}
                        </>
                    )}
                    <Route path='/checkout' element={<OrderDetail />} />
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                    {/* Same as */}
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
