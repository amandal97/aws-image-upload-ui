import github from "../images/github.png";

const RightSection = () => {
  return (
    <div className="rightSectionContainer">
      <div className="container">
        <a
          href="https://github.com/amandal97/aws-image-upload-ui"
          target="_blank">
          <div className="item">
            <img src={github} width="20px" height="20px" />
            <div>app-client</div>
          </div>
        </a>
        <a href="https://github.com/amandal97/aws-image-upload" target="_blank">
          <div className="item">
            <img src={github} width="20px" height="20px" />
            <div>app-server</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default RightSection;
