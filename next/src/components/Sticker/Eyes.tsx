import classNames from 'classnames';

type EyesProps = {
  className?: string;
};

const Eyes = (props: EyesProps) => {
  const classes = classNames(props.className);

  return (
    <svg
      className={classes}
      width="220"
      height="220"
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M110.27 120.616C110.271 124.351 108.214 127.379 105.676 127.379C103.137 127.38 101.079 124.353 101.079 120.618C101.078 116.884 103.135 113.856 105.672 113.856C108.21 113.855 110.269 116.882 110.27 120.616Z"
        fill="#1E1E1E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M108.089 90.0571L106.967 91.6019C108.143 92.6801 109.224 93.9359 110.193 95.3354C113.543 90.4951 118.23 87.3735 123.528 87.3722C128.89 87.3711 133.63 90.5683 136.987 95.5046C140.347 100.446 142.394 107.218 142.395 114.649C142.397 122.08 140.354 128.852 136.996 133.795C133.641 138.733 128.902 141.932 123.541 141.934C118.242 141.935 113.554 138.815 110.202 133.977C106.855 138.815 102.165 141.938 96.8675 141.94C91.5059 141.941 86.7652 138.744 83.4087 133.808C80.0485 128.866 78.0016 122.094 78 114.663C77.9982 107.232 80.0419 100.46 83.3998 95.5167C86.754 90.5789 91.4931 87.3796 96.8548 87.3785C99.9693 87.3778 102.874 88.4563 105.42 90.328L106.461 88.8944C108.474 85.9341 110.876 83.5601 113.609 81.8586C116.642 79.9696 119.925 79.0009 123.354 79C126.782 78.9994 130.065 79.966 133.1 81.854C133.569 82.1457 133.713 82.7624 133.421 83.2313C133.13 83.7003 132.513 83.844 132.044 83.5523C129.309 81.8511 126.389 80.9995 123.354 81C120.319 81.0009 117.399 81.8542 114.666 83.5564C112.195 85.0949 109.985 87.2661 108.107 90.0313L108.096 90.0476L108.089 90.0571ZM111.371 132.124C114.511 137.031 118.859 139.935 123.54 139.934C128.043 139.933 132.233 137.247 135.341 132.671C138.446 128.101 140.397 121.732 140.395 114.649C140.394 107.566 138.439 101.198 135.333 96.6292C132.223 92.0553 128.031 89.3713 123.528 89.3722C118.847 89.3733 114.5 92.2787 111.363 97.1875C114.095 101.934 115.721 108.032 115.722 114.655C115.724 121.277 114.101 127.376 111.371 132.124ZM96.8552 89.3785C101.358 89.3775 105.549 92.0613 108.66 96.6352C111.766 101.204 113.721 107.572 113.722 114.655C113.724 121.738 111.773 128.107 108.668 132.677C105.56 137.253 101.37 139.939 96.8671 139.94C92.3642 139.941 88.1727 137.257 85.0625 132.683C81.956 128.114 80.0015 121.746 80 114.663C79.9983 107.579 81.9498 101.211 85.0542 96.6406C88.1622 92.0652 92.3524 89.3794 96.8552 89.3785Z"
        fill="#1E1E1E"
      />
      <path
        d="M81.6072 90.2793C81.2969 90.7362 80.6749 90.855 80.2181 90.5447C79.7612 90.2343 79.6424 89.6124 79.9527 89.1556C81.9676 86.1892 84.3725 83.8106 87.1089 82.1067C90.1426 80.2176 93.4257 79.249 96.8542 79.248C100.282 79.2474 103.565 80.2141 106.601 82.1021C107.07 82.3938 107.213 83.0104 106.922 83.4794C106.63 83.9483 106.013 84.092 105.544 83.8003C102.809 82.0991 99.8896 81.2475 96.8545 81.248C93.8191 81.2489 90.8997 82.1023 88.1661 83.8044C85.6954 85.3429 83.4854 87.5141 81.6072 90.2793Z"
        fill="#1E1E1E"
      />
      <path
        d="M136.943 120.61C136.944 124.344 134.887 127.372 132.349 127.372C129.811 127.373 127.752 124.346 127.752 120.612C127.751 116.877 129.808 113.849 132.346 113.849C134.884 113.848 136.942 116.875 136.943 120.61Z"
        fill="#1E1E1E"
      />
    </svg>
  );
};

export default Eyes;
