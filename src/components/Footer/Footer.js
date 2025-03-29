import './footer.css'

function Footer() {
  return (
    <div className="footer-container">
      <div className="text-with-logo-container">
        <div className="text-container">
          <p>
            For any queries, contact +91-9876543210 or mail us
            help@nxtmart.co.in
          </p>
        </div>
        <div className="brand-icon-container">
          <img
            height="20px"
            src="https://i.imgur.com/DgFmDSk.png"
            alt="facebook"
          />
          <img
            height="20px"
            src="https://i.imgur.com/AilMgnt.png"
            alt="pinterest"
          />
          <img
            height="20px"
            src="https://i.imgur.com/vXeSUrt.png"
            alt="twitter"
          />
          <img
            height="20px"
            src="https://i.imgur.com/8zOcpv0.png"
            alt="instagram"
          />
        </div>
      </div>
      <div className="copyright-text-container">
        <p>Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd</p>
      </div>
    </div>
  )
}

export default Footer
