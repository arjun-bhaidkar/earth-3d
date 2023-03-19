import { browserHasImmersiveArCompatibility } from '../../utils/domUtils';
import './Navbar.css';

function Navbar({
  setIsARMode,
  isInARMode
}) {
  const onClickSwitchToAR = () => {
    browserHasImmersiveArCompatibility().then(isImmersiveArSupported => {
      if(!isInARMode){
        if (isImmersiveArSupported) {
          setIsARMode(true);
        } else {
          alert("😢 Oh no! AR is not supported by this device/browser");
        }
      } else {
        setIsARMode(false);
      }
   
    })

  }

  return (
    <div className="navbar">
      <h2>
        3D Earth
      </h2>
      <button className='btn' onClick={() => onClickSwitchToAR()}>
        {
          isInARMode ?
            "Close AR"
            :
            "AR view"
        }
      </button>
    </div>
  );
}

export default Navbar;
