// https://launchlibrary.net/1.4/launch?startdate=2020-05-20&enddate=2020-05-20&limit=10000&fields=name,net,location,status,rocket,mapURL,countryCode
import React, {useState, useEffect} from 'react'
// class MyComponent extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     error: null,
  //     isLoaded: false,
  //     items: null,
  //   };
  // }

//   componentDidMount() {
//     fetch("https://launchlibrary.net/1.4/launch?startdate=2020-01-01&enddate=2020-05-18&limit=10000")
//       .then(res => res.json())
//       .then((result) => {this.setState({items: result})},
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error
//           });
//         }
//       )
//   }

//   render() {
//     const { error, isLoaded, items } = this.state;
//     console.log(this.state.items)
//     if (error) {
//       return <div>Ошибка: {error.message}</div>;
//     } else if (!isLoaded) {
//     return (<div>Загрузка...</div>)
//     } else {
//       return (
//         <div>
//           {console.log(this.state.items)}
//         </div>
//       )
//     }
//   }
// }

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    fetch("https://launchlibrary.net/1.4/launch?startdate=2020-01-01&enddate=2020-05-18&limit=10000")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        // Примечание: Обрабатывать ошибки необходимо именно здесь
        // вместо блока catch(), чтобы не пропустить
        // исключения из реальных ошибок в компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>{console.log(items)}</div>
    );
  }
}

export default MyComponent