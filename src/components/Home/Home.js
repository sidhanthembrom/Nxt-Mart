import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner/dist/loader/ThreeDots'
import Card from '../Card/Card'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import NxtMartContext from '../../context/Context'
import './home.css'

class Home extends Component {
  state = {
    categoryList: [],
    data: [],
    categorySelected: 'Fruits & Vegetables',
    isLoading: true,
    isFailed: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const data = await fetch(
      'https://apis2.ccbp.in/nxt-mart/category-list-details',
    )
    const response = await data.json()

    // console.log(response.categories)
    if (response.categories.length === 15) {
      console.log('yes')
      const tempArr = response.categories.map(obj => obj.name)
      this.setState({
        categoryList: tempArr,
        data: response.categories,
        isLoading: false,
        isFailed: false,
      })
    } else {
      console.log('no')
      this.setState({isFailed: true})
    }
  }

  changingTheCategory = val => {
    this.setState({categorySelected: val})
  }

  handleRetryBtn = () => {
    this.fetchData()
  }

  render() {
    const {
      isLoading,
      isFailed,
      categoryList,
      data,
      categorySelected,
    } = this.state

    return (
      <NxtMartContext.Consumer>
        {value => {
          const {cartList} = value

          return (
            <div className="main-container">
              <Header componentName="home" cartList={cartList} />

              {isLoading && (
                <div className="loader-container" data-testid="loader">
                  <ThreeDots color="#4fa94d" height={50} width={50} />
                </div>
              )}

              {!isLoading && isFailed && (
                <div className="failure-view-page-container">
                  <div className="failure-view-box">
                    <img
                      width="350px"
                      height="200px"
                      src="https://i.imgur.com/JRUhDEh.png"
                      alt="failure view"
                    />
                    <h1>Oops! Something Went Wrong</h1>
                    <p>We are having some trouble</p>
                    <button
                      type="button"
                      className="retry-btn"
                      onClick={this.handleRetryBtn}
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {!isLoading && !isFailed && (
                <>
                  <div className="homepage-container">
                    <div className="left-panel">
                      <h2>Categories</h2>
                      <ul className="categories-list">
                        {categoryList &&
                          categoryList.map(val => (
                            <li
                              key={val}
                              className={
                                val === categorySelected ? 'selected' : 'normal'
                              }
                            >
                              <a
                                className={
                                  val === categorySelected
                                    ? 'selectedText'
                                    : 'normalText'
                                }
                                href={`#${val}`}
                                onClick={() => this.changingTheCategory(val)}
                              >
                                {val}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <ul className="right-panel">
                      {data.map(obj => (
                        <li key={obj.name}>
                          <h2 id={obj.name}>{`${obj.name} >`}</h2>
                          <div className="card-container-list">
                            {obj.products.map(product => (
                              <Card key={product.id} product={product} />
                            ))}
                          </div>
                          <hr />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Footer />
                </>
              )}
            </div>
          )
        }}
      </NxtMartContext.Consumer>
    )
  }
}

export default Home
