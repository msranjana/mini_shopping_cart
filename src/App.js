import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';
 
function App() {
    const [courses, setCourses] = useState([
        { id: 1, 
          name: 'Antique Jhumkas', 
          price: 799, 
          image: 
'https://aspfashionjewellery.com/cdn/shop/files/Picsart_23-06-30_15-25-59-300.jpg?v=1688211968'
        },
        { id: 2, 
          name: 'Silver Jhumkas', 
          price: 899, 
          image: 
'https://img0.junaroad.com/uiproducts/18311500/zoom_0-1648280941.jpg'
        },
        { id: 3, 
          name: 'Oxidized Jhumkas', 
          price: 1299, 
          image: 
'https://5.imimg.com/data5/SELLER/Default/2022/3/FI/IT/TA/660230/oxder-1757-1.JPG'
        },
        { id: 4, 
            name: 'Beaded Jhumkas', 
            price: 699, 
            image: 
  'https://assets.ajio.com/medias/sys_master/root/20210605/b5Eu/60bb0ed1f997ddb312b7ef12/-288Wx360H-462421615-blue-MODEL.jpg'
          }

    ]);
 
    const [cartCourses, setCartCourses] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');
 
    const addCourseToCartFunction = (Jcourse) => {
        const alreadyCourses = cartCourses
                               .find(item => item.product.id === Jcourse.id);
        if (alreadyCourses) {
            const latestCartUpdate = cartCourses.map(item =>
                item.product.id === Jcourse.id ? { 
                ...item, quantity: item.quantity + 1 } 
                : item
            );
            setCartCourses(latestCartUpdate);
        } else {
            setCartCourses([...cartCourses, {product: Jcourse, quantity: 1}]);
        }
    };
 
    const deleteCourseFromCartFunction = (JCourse) => {
        const updatedCart = cartCourses
                            .filter(item => item.product.id !== JCourse.id);
        setCartCourses(updatedCart);
    };
 
    const totalAmountCalculationFunction = () => {
        return cartCourses
               .reduce((total, item) => 
                           total + item.product.price * item.quantity, 0);
    };
 
    const courseSearchUserFunction = (event) => {
        setSearchCourse(event.target.value);
    };
 
    const filterCourseFunction = courses.filter((course) =>
        course.name.toLowerCase().includes(searchCourse.toLowerCase())
    );
 
    return (
        <div className="App">
            <SearchComponent searchCourse={searchCourse} 
                             courseSearchUserFunction=
                                 {courseSearchUserFunction} />
            <main className="App-main">
                <ShowCourseComponent
                    courses={courses}
                    filterCourseFunction={filterCourseFunction}
                    addCourseToCartFunction={addCourseToCartFunction}
                />
 
                <UserCartComponent
                    cartCourses={cartCourses}
                    deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                    totalAmountCalculationFunction={
                        totalAmountCalculationFunction
                    }
                    setCartCourses={setCartCourses}
                />
            </main>
        </div>
    );
}
 
export default App;
