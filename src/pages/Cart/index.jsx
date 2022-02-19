const Cart = () => {
  let date = new Date();
  let time = ((date.getHours().toString()).length>1? date.getHours() : "0"+date.getHours()) +":"+ ((date.getMinutes().toString()).length>1? date.getMinutes() : "0"+date.getMinutes());
  let dotd =
    ((date.getDate().toString()).length>1? date.getDate() : "0"+date.getDate())
    +"/"+
    (((date.getMonth()+1).toString()).length>1? (date.getMonth()+1) : "0"+(date.getMonth()+1))
    +"/"+
    date.getFullYear();


  //localStorage.setItem("human.__cart", "test")
  localStorage.removeItem("human.__cart")

  if(localStorage.getItem("human.__cart") === null){
    return(
      <div className="container">
        <div className="cart">
          <div className="ticket">
          <p>*******************************************************</p>
          <p>*                                    <span className="bold">HUMAN.</span>                                      *</p>
          <p>*                         Clothing for humans.                           *</p>
          <p>*******************************************************</p>
          <p>*                           Details of your cart                              *</p>
          <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
          <p>*       Names of the products     |   Quantity   |   Price   *</p>
          <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
          <p>*                                                                                          *</p>
          <p>*                                                                                          *</p>
          <p>*                                                                                          *</p>
          <p>*                           Your cart is empty.                              *</p>
          <p>*                                                                                          *</p>
          <p>*                                                                                          *</p>
          <p>*                                                                                          *</p>
          <p>*******************************************************</p>
          <p>*    TVA included                           TOTAL    |        0€    *</p>
          <p>*******************************************************</p>
          </div>
        </div>
      </div>
    )
  }else{

    //process in data in localStorage

    return(
      <div className="container">
        <div className="cart">
          <div className="ticket">
            <p>*******************************************************</p>
            <p>*                                    <span className="bold">HUMAN.</span>                                      *</p>
            <p>*                         Clothing for humans.                           *</p>
            <p>*******************************************************</p>
            <p>*                           Details of your cart                              *</p>
            <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
            <p>*       Names of the products     |   Quantity   |   Price   *</p>
            <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
            <p>*       Title of the first product         |      x1 |     40 €       *</p>
            <p>*    Title of the second product      |      x1 |     60 €       *</p>
            <p>*       Title of the third product        |      x1 |     45 €       *</p>
            <p>*     Title of the fourth product        |      x1 |      5 €       *</p>
            <p>*                                                                                          *</p>
            <p>*******************************************************</p>
            <p>*    TVA included                           TOTAL    |      200€    *</p>
            <p>*******************************************************</p>
          </div>
        </div>
      </div>
    )
  }

};
export default Cart;
