import './LandingPage.scss';

const LandingPage = () => {
    return(
        <div className='landing' id='landing'>

      <div className="land_cov">
        <div className="land_item1">
          <p className="hdy">
            ChainLink Converter: Focusing narrowly on the interoperability problem between two blockchains, Ethereum and
      Algorand
          </p>
          <p className="suby">
          Inventing a converter for Algorand and Ethereum using Chainlink. The converter will allow interoperability between the two blockchains. A keystone to the converter is goLink. goLink allows for LINK transactions on the Algorand blockcahin, while the Chainlink Converter allows for asset movement between the Algorand and Ethereum blockchains.
            <br />
            <br />
            The Converter processes data from the Algorand blockchain which is sent to a Chainlink node for validation and then processed by a smart contract for on-chain distribution of LINK on Ethereum. Thus, Chainlink allows for the converter to operate in bi-lateral fashion, from Ethereum to Algorand and visa versa. As such, the Chainlink Converter strives to solve the interoperability problem between Algorand and Ethereum for Chainlink.
          </p>
        </div>
        </div>
    </div>
    )
}

export default LandingPage;