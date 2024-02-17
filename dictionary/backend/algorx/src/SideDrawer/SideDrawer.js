import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AlgorxLogo from "../Assets/images/svg/AlgoRX_logo.svg";

function SideDrawer() {
  let pathName = window.location.pathname;
  const navigate = useNavigate();

  return (
    <aside className="asidemain">
      <div className="asidechat">
        <img src={AlgorxLogo} alt="side drawer logo" />
      </div>
      <ul className="chatmenu">
        <li>
          <Link
            to="/Dashboard"
            className={pathName === "/Dashboard" ? "active" : ""}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0918 19.25H21.3828V17.5547C21.3843 17.4908 21.373 17.4273 21.3496 17.3678C21.3263 17.3083 21.2913 17.2541 21.2467 17.2083C21.2022 17.1624 21.149 17.126 21.0902 17.1009C21.0314 17.0759 20.9682 17.0628 20.9043 17.0625H19.373C19.2411 17.0621 19.1143 17.1135 19.0197 17.2055C18.9252 17.2975 18.8704 17.4228 18.8672 17.5547V19.25H17.1308C16.9989 19.2496 16.8721 19.301 16.7775 19.393C16.683 19.485 16.6282 19.6103 16.625 19.7422V21.2734C16.6282 21.4053 16.683 21.5307 16.7775 21.6227C16.8721 21.7147 16.9989 21.766 17.1308 21.7656H18.8672V23.5156C18.8704 23.6475 18.9252 23.7729 19.0197 23.8649C19.1143 23.9569 19.2411 24.0082 19.373 24.0078H20.9043C20.9682 24.0075 21.0314 23.9944 21.0902 23.9694C21.149 23.9444 21.2022 23.9079 21.2467 23.8621C21.2913 23.8163 21.3263 23.762 21.3496 23.7025C21.373 23.6431 21.3843 23.5795 21.3828 23.5156V21.7656H23.0918C23.1557 21.7653 23.2189 21.7522 23.2777 21.7272C23.3365 21.7022 23.3897 21.6657 23.4342 21.6199C23.4788 21.5741 23.5138 21.5198 23.5371 21.4603C23.5605 21.4009 23.5718 21.3373 23.5703 21.2734V19.7422C23.5718 19.6783 23.5605 19.6148 23.5371 19.5553C23.5138 19.4958 23.4788 19.4416 23.4342 19.3958C23.3897 19.3499 23.3365 19.3135 23.2777 19.2884C23.2189 19.2634 23.1557 19.2503 23.0918 19.25V19.25ZM22.8047 21H21.123C20.9911 20.9997 20.8643 21.051 20.7697 21.143C20.6752 21.235 20.6204 21.3603 20.6172 21.4922V23.2422H19.6328V21.4922C19.6343 21.4283 19.623 21.3648 19.5996 21.3053C19.5763 21.2458 19.5413 21.1916 19.4967 21.1458C19.4522 21.0999 19.399 21.0635 19.3401 21.0384C19.2813 21.0134 19.2182 21.0003 19.1542 21H17.3906V20.0156H19.1542C19.2182 20.0153 19.2813 20.0022 19.3401 19.9772C19.399 19.9522 19.4522 19.9157 19.4967 19.8699C19.5413 19.8241 19.5763 19.7698 19.5996 19.7103C19.623 19.6509 19.6343 19.5873 19.6328 19.5234V17.8281H20.6172V19.5234C20.6204 19.6553 20.6752 19.7807 20.7697 19.8727C20.8643 19.9647 20.9911 20.016 21.123 20.0156H22.8047V21Z"
                fill="#F8F5F0"
              />
              <path
                d="M20.2251 13.8446C19.1676 13.8449 18.1259 14.101 17.1889 14.5911C16.2518 15.0812 15.4473 15.7907 14.8438 16.6591C14.7407 16.6274 14.6432 16.5966 14.5512 16.5666L14.1796 15.5128C15.3281 14.6524 15.6426 13.3089 15.7285 12.6581C16.5008 12.4486 17.21 11.5411 17.4942 10.3386C17.6473 9.68823 17.4231 9.08267 16.9361 8.83171C16.8011 8.76223 16.6515 8.72594 16.4997 8.72584C16.5248 8.53711 16.5511 8.30627 16.5782 8.02283C16.6418 7.35963 16.6821 6.68977 16.6821 6.52002C16.6821 6.39971 16.6846 6.27567 16.6871 6.14437C16.7074 5.09716 16.7326 3.79396 15.5775 2.62561C14.5408 1.57714 13.0732 0.999153 11.5515 1.04121C10.0356 1.08266 8.61416 1.7295 7.65144 2.81587C7.62191 2.8493 7.5919 2.88295 7.56142 2.91682C6.98075 3.56564 6.18543 4.45425 6.24252 6.72985C6.24799 6.9526 6.46127 7.97339 6.68216 8.75138C6.5534 8.76416 6.42853 8.80274 6.31498 8.8648C5.84746 9.11745 5.63309 9.70972 5.78151 10.3387C6.06588 11.5433 6.77742 12.4518 7.55147 12.659C7.644 13.2972 7.96791 14.6274 9.08704 15.4885L8.59687 16.4965C8.24687 16.6062 7.85241 16.7149 7.44527 16.829C4.81376 17.5666 1.20312 18.5766 1.20312 21.858V25.289C1.20312 26.0995 1.63663 26.9609 2.41478 26.9609H20.248C20.2515 26.9609 20.255 26.9605 20.2585 26.9604C21.9941 26.9504 23.655 26.2528 24.8772 25.0205C26.0994 23.7881 26.7832 22.1215 26.7788 20.3858C26.7744 18.6502 26.0821 16.9871 24.8536 15.761C23.6252 14.5348 21.9607 13.8457 20.2251 13.8446V13.8446ZM8.13203 3.42722C8.16331 3.39229 8.19417 3.35766 8.22462 3.32332C9.04734 2.39483 10.2676 1.84189 11.5725 1.80623C12.8838 1.76981 14.1449 2.26517 15.0331 3.16363C15.9609 4.10201 15.9401 5.17897 15.9217 6.12917C15.9191 6.26435 15.9166 6.39205 15.9166 6.51969C15.9166 6.60085 15.9084 6.76923 15.8944 6.98344C15.7093 6.29531 15.4505 5.63069 15.0941 5.24208L15.0658 5.18542C15.0334 5.12075 14.9834 5.06655 14.9216 5.02911C14.8597 4.99166 14.7886 4.97249 14.7163 4.97383C14.644 4.97516 14.5735 4.99694 14.5131 5.03664C14.4527 5.07634 14.4047 5.13235 14.3748 5.19817C13.758 6.55491 13.147 6.50028 12.1347 6.40999C12.0172 6.39949 11.8976 6.38882 11.7761 6.3804C11.391 6.35306 11.2516 6.57815 11.2096 6.67571C11.0848 6.96556 11.2582 7.27853 11.5756 7.64964C10.5651 7.529 10.3089 6.78985 10.0781 6.1231C9.91796 5.66033 9.73645 5.13577 9.20861 5.13577C8.95427 5.13079 8.7018 5.18028 8.46817 5.28094C8.23453 5.38159 8.02514 5.53107 7.85405 5.71934C7.46178 6.14043 7.24073 6.74079 7.11769 7.32912C7.06788 7.12546 7.03135 6.91878 7.00831 6.71038C6.95838 4.73857 7.58187 4.04185 8.13203 3.42722ZM8.28226 12.3054C8.27764 12.2068 8.23535 12.1137 8.16413 12.0454C8.0929 11.977 7.99816 11.9386 7.89945 11.938C7.89398 11.938 7.88851 11.938 7.88277 11.938C7.32211 11.938 6.73012 11.0234 6.52652 10.1626C6.44859 9.83227 6.55091 9.60734 6.67893 9.53811C6.82369 9.46002 6.97807 9.59756 7.03768 9.66039C7.08772 9.71308 7.15172 9.75044 7.22221 9.76811C7.2927 9.78577 7.36675 9.78301 7.43573 9.76014C7.5047 9.73727 7.56574 9.69525 7.61172 9.63897C7.65769 9.5827 7.6867 9.5145 7.69535 9.44235C7.73307 9.37669 7.75037 9.30128 7.74506 9.22574C7.70437 8.63856 7.74545 6.95768 8.41444 6.24078C8.50905 6.13582 8.62436 6.05156 8.7531 5.9933C8.88185 5.93504 9.02126 5.90405 9.16256 5.90227C9.22009 5.98534 9.29687 6.2071 9.35446 6.37362C9.63818 7.19328 10.1662 8.71862 12.5064 8.38475C12.5782 8.37452 12.6455 8.34413 12.7007 8.29711C12.7559 8.2501 12.7965 8.1884 12.818 8.11918C12.8395 8.04996 12.8408 7.97607 12.822 7.9061C12.8031 7.83612 12.7648 7.77295 12.7114 7.72391C12.5258 7.55329 12.3497 7.3727 12.1837 7.18294C13.0837 7.26109 14.0018 7.29051 14.7605 6.09663C15.24 6.99591 15.4896 8.78413 15.5508 9.49425C15.559 9.58968 15.6027 9.67856 15.6732 9.74336C15.7437 9.80815 15.836 9.84415 15.9318 9.84425C15.9427 9.84425 15.9537 9.84376 15.965 9.84277C16.0343 9.83683 16.1007 9.81207 16.1571 9.77117C16.2134 9.73027 16.2575 9.67478 16.2846 9.61068C16.3601 9.53598 16.4754 9.45537 16.5854 9.51186C16.7258 9.58421 16.8271 9.83102 16.749 10.1626C16.5455 11.0236 15.9536 11.9382 15.3928 11.9382H15.3832C15.3089 11.937 15.2358 11.9573 15.1728 11.9966C15.1193 12.0299 15.0749 12.076 15.0436 12.1307C15.0123 12.1854 14.995 12.247 14.9932 12.31C14.9768 12.623 14.8286 14.2237 13.5243 15.0343C13.5221 15.0356 13.5202 15.037 13.5181 15.0383C13.0103 15.3516 12.3776 15.5105 11.6378 15.5105C10.8999 15.5105 10.2687 15.348 9.76145 15.0273C8.47569 14.2155 8.30364 12.6175 8.2822 12.3054H8.28226ZM9.21364 16.9789L9.74411 15.8882C10.2934 16.1456 10.9282 16.276 11.6378 16.276C12.3372 16.276 12.9635 16.1521 13.507 15.9079L13.8913 16.9978C13.9105 17.0524 13.9419 17.1019 13.983 17.1426C14.0242 17.1834 14.074 17.2142 14.1288 17.2329C14.2242 17.2654 14.3251 17.2986 14.4317 17.3325C14.2441 17.6848 14.0893 18.0535 13.9692 18.4341C13.6149 18.8537 12.8714 19.4954 11.6378 19.4954C11.2216 19.4999 10.809 19.4166 10.4271 19.251C10.0452 19.0853 9.70247 18.841 9.42134 18.5339C9.01753 18.1008 8.78899 17.618 8.71194 17.2624C8.80584 17.2336 8.89788 17.2047 8.98778 17.1755C9.0367 17.1596 9.0819 17.134 9.1207 17.1002C9.1595 17.0664 9.19109 17.0251 9.21359 16.9789H9.21364ZM1.96875 25.289V21.858C1.96875 19.1571 5.12285 18.275 7.65177 17.5662C7.75879 17.5362 7.86767 17.5066 7.9718 17.4773C8.24879 18.6409 9.49659 20.2608 11.6359 20.2608C12.369 20.2701 13.0888 20.065 13.707 19.6708C13.5607 20.9785 13.8112 22.3 14.4257 23.4635C15.0403 24.627 15.9906 25.5789 17.1531 26.1953H2.41478C2.17109 26.1953 1.96875 25.7081 1.96875 25.289ZM20.2251 26.1953C19.0794 26.1953 17.9595 25.8556 17.007 25.2191C16.0544 24.5826 15.312 23.6779 14.8735 22.6195C14.4351 21.561 14.3204 20.3964 14.5439 19.2727C14.7674 18.1491 15.3191 17.117 16.1292 16.3069C16.9393 15.4968 17.9714 14.9451 19.0951 14.7216C20.2187 14.4981 21.3834 14.6128 22.4418 15.0512C23.5002 15.4896 24.4049 16.2321 25.0414 17.1846C25.6779 18.1372 26.0176 19.2571 26.0176 20.4028C26.0159 21.9385 25.4051 23.4109 24.3191 24.4968C23.2332 25.5828 21.7608 26.1936 20.2251 26.1953V26.1953Z"
                fill="#F8F5F0"
              />
            </svg>

            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/ViewPatient"
            className={pathName === "/ViewPatient" ? "active" : ""}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0918 19.25H21.3828V17.5547C21.3843 17.4908 21.373 17.4273 21.3496 17.3678C21.3263 17.3083 21.2913 17.2541 21.2467 17.2083C21.2022 17.1624 21.149 17.126 21.0902 17.1009C21.0314 17.0759 20.9682 17.0628 20.9043 17.0625H19.373C19.2411 17.0621 19.1143 17.1135 19.0197 17.2055C18.9252 17.2975 18.8704 17.4228 18.8672 17.5547V19.25H17.1308C16.9989 19.2496 16.8721 19.301 16.7775 19.393C16.683 19.485 16.6282 19.6103 16.625 19.7422V21.2734C16.6282 21.4053 16.683 21.5307 16.7775 21.6227C16.8721 21.7147 16.9989 21.766 17.1308 21.7656H18.8672V23.5156C18.8704 23.6475 18.9252 23.7729 19.0197 23.8649C19.1143 23.9569 19.2411 24.0082 19.373 24.0078H20.9043C20.9682 24.0075 21.0314 23.9944 21.0902 23.9694C21.149 23.9444 21.2022 23.9079 21.2467 23.8621C21.2913 23.8163 21.3263 23.762 21.3496 23.7025C21.373 23.6431 21.3843 23.5795 21.3828 23.5156V21.7656H23.0918C23.1557 21.7653 23.2189 21.7522 23.2777 21.7272C23.3365 21.7022 23.3897 21.6657 23.4342 21.6199C23.4788 21.5741 23.5138 21.5198 23.5371 21.4603C23.5605 21.4009 23.5718 21.3373 23.5703 21.2734V19.7422C23.5718 19.6783 23.5605 19.6148 23.5371 19.5553C23.5138 19.4958 23.4788 19.4416 23.4342 19.3958C23.3897 19.3499 23.3365 19.3135 23.2777 19.2884C23.2189 19.2634 23.1557 19.2503 23.0918 19.25V19.25ZM22.8047 21H21.123C20.9911 20.9997 20.8643 21.051 20.7697 21.143C20.6752 21.235 20.6204 21.3603 20.6172 21.4922V23.2422H19.6328V21.4922C19.6343 21.4283 19.623 21.3648 19.5996 21.3053C19.5763 21.2458 19.5413 21.1916 19.4967 21.1458C19.4522 21.0999 19.399 21.0635 19.3401 21.0384C19.2813 21.0134 19.2182 21.0003 19.1542 21H17.3906V20.0156H19.1542C19.2182 20.0153 19.2813 20.0022 19.3401 19.9772C19.399 19.9522 19.4522 19.9157 19.4967 19.8699C19.5413 19.8241 19.5763 19.7698 19.5996 19.7103C19.623 19.6509 19.6343 19.5873 19.6328 19.5234V17.8281H20.6172V19.5234C20.6204 19.6553 20.6752 19.7807 20.7697 19.8727C20.8643 19.9647 20.9911 20.016 21.123 20.0156H22.8047V21Z"
                fill="#F8F5F0"
              />
              <path
                d="M20.2251 13.8446C19.1676 13.8449 18.1259 14.101 17.1889 14.5911C16.2518 15.0812 15.4473 15.7907 14.8438 16.6591C14.7407 16.6274 14.6432 16.5966 14.5512 16.5666L14.1796 15.5128C15.3281 14.6524 15.6426 13.3089 15.7285 12.6581C16.5008 12.4486 17.21 11.5411 17.4942 10.3386C17.6473 9.68823 17.4231 9.08267 16.9361 8.83171C16.8011 8.76223 16.6515 8.72594 16.4997 8.72584C16.5248 8.53711 16.5511 8.30627 16.5782 8.02283C16.6418 7.35963 16.6821 6.68977 16.6821 6.52002C16.6821 6.39971 16.6846 6.27567 16.6871 6.14437C16.7074 5.09716 16.7326 3.79396 15.5775 2.62561C14.5408 1.57714 13.0732 0.999153 11.5515 1.04121C10.0356 1.08266 8.61416 1.7295 7.65144 2.81587C7.62191 2.8493 7.5919 2.88295 7.56142 2.91682C6.98075 3.56564 6.18543 4.45425 6.24252 6.72985C6.24799 6.9526 6.46127 7.97339 6.68216 8.75138C6.5534 8.76416 6.42853 8.80274 6.31498 8.8648C5.84746 9.11745 5.63309 9.70972 5.78151 10.3387C6.06588 11.5433 6.77742 12.4518 7.55147 12.659C7.644 13.2972 7.96791 14.6274 9.08704 15.4885L8.59687 16.4965C8.24687 16.6062 7.85241 16.7149 7.44527 16.829C4.81376 17.5666 1.20312 18.5766 1.20312 21.858V25.289C1.20312 26.0995 1.63663 26.9609 2.41478 26.9609H20.248C20.2515 26.9609 20.255 26.9605 20.2585 26.9604C21.9941 26.9504 23.655 26.2528 24.8772 25.0205C26.0994 23.7881 26.7832 22.1215 26.7788 20.3858C26.7744 18.6502 26.0821 16.9871 24.8536 15.761C23.6252 14.5348 21.9607 13.8457 20.2251 13.8446V13.8446ZM8.13203 3.42722C8.16331 3.39229 8.19417 3.35766 8.22462 3.32332C9.04734 2.39483 10.2676 1.84189 11.5725 1.80623C12.8838 1.76981 14.1449 2.26517 15.0331 3.16363C15.9609 4.10201 15.9401 5.17897 15.9217 6.12917C15.9191 6.26435 15.9166 6.39205 15.9166 6.51969C15.9166 6.60085 15.9084 6.76923 15.8944 6.98344C15.7093 6.29531 15.4505 5.63069 15.0941 5.24208L15.0658 5.18542C15.0334 5.12075 14.9834 5.06655 14.9216 5.02911C14.8597 4.99166 14.7886 4.97249 14.7163 4.97383C14.644 4.97516 14.5735 4.99694 14.5131 5.03664C14.4527 5.07634 14.4047 5.13235 14.3748 5.19817C13.758 6.55491 13.147 6.50028 12.1347 6.40999C12.0172 6.39949 11.8976 6.38882 11.7761 6.3804C11.391 6.35306 11.2516 6.57815 11.2096 6.67571C11.0848 6.96556 11.2582 7.27853 11.5756 7.64964C10.5651 7.529 10.3089 6.78985 10.0781 6.1231C9.91796 5.66033 9.73645 5.13577 9.20861 5.13577C8.95427 5.13079 8.7018 5.18028 8.46817 5.28094C8.23453 5.38159 8.02514 5.53107 7.85405 5.71934C7.46178 6.14043 7.24073 6.74079 7.11769 7.32912C7.06788 7.12546 7.03135 6.91878 7.00831 6.71038C6.95838 4.73857 7.58187 4.04185 8.13203 3.42722ZM8.28226 12.3054C8.27764 12.2068 8.23535 12.1137 8.16413 12.0454C8.0929 11.977 7.99816 11.9386 7.89945 11.938C7.89398 11.938 7.88851 11.938 7.88277 11.938C7.32211 11.938 6.73012 11.0234 6.52652 10.1626C6.44859 9.83227 6.55091 9.60734 6.67893 9.53811C6.82369 9.46002 6.97807 9.59756 7.03768 9.66039C7.08772 9.71308 7.15172 9.75044 7.22221 9.76811C7.2927 9.78577 7.36675 9.78301 7.43573 9.76014C7.5047 9.73727 7.56574 9.69525 7.61172 9.63897C7.65769 9.5827 7.6867 9.5145 7.69535 9.44235C7.73307 9.37669 7.75037 9.30128 7.74506 9.22574C7.70437 8.63856 7.74545 6.95768 8.41444 6.24078C8.50905 6.13582 8.62436 6.05156 8.7531 5.9933C8.88185 5.93504 9.02126 5.90405 9.16256 5.90227C9.22009 5.98534 9.29687 6.2071 9.35446 6.37362C9.63818 7.19328 10.1662 8.71862 12.5064 8.38475C12.5782 8.37452 12.6455 8.34413 12.7007 8.29711C12.7559 8.2501 12.7965 8.1884 12.818 8.11918C12.8395 8.04996 12.8408 7.97607 12.822 7.9061C12.8031 7.83612 12.7648 7.77295 12.7114 7.72391C12.5258 7.55329 12.3497 7.3727 12.1837 7.18294C13.0837 7.26109 14.0018 7.29051 14.7605 6.09663C15.24 6.99591 15.4896 8.78413 15.5508 9.49425C15.559 9.58968 15.6027 9.67856 15.6732 9.74336C15.7437 9.80815 15.836 9.84415 15.9318 9.84425C15.9427 9.84425 15.9537 9.84376 15.965 9.84277C16.0343 9.83683 16.1007 9.81207 16.1571 9.77117C16.2134 9.73027 16.2575 9.67478 16.2846 9.61068C16.3601 9.53598 16.4754 9.45537 16.5854 9.51186C16.7258 9.58421 16.8271 9.83102 16.749 10.1626C16.5455 11.0236 15.9536 11.9382 15.3928 11.9382H15.3832C15.3089 11.937 15.2358 11.9573 15.1728 11.9966C15.1193 12.0299 15.0749 12.076 15.0436 12.1307C15.0123 12.1854 14.995 12.247 14.9932 12.31C14.9768 12.623 14.8286 14.2237 13.5243 15.0343C13.5221 15.0356 13.5202 15.037 13.5181 15.0383C13.0103 15.3516 12.3776 15.5105 11.6378 15.5105C10.8999 15.5105 10.2687 15.348 9.76145 15.0273C8.47569 14.2155 8.30364 12.6175 8.2822 12.3054H8.28226ZM9.21364 16.9789L9.74411 15.8882C10.2934 16.1456 10.9282 16.276 11.6378 16.276C12.3372 16.276 12.9635 16.1521 13.507 15.9079L13.8913 16.9978C13.9105 17.0524 13.9419 17.1019 13.983 17.1426C14.0242 17.1834 14.074 17.2142 14.1288 17.2329C14.2242 17.2654 14.3251 17.2986 14.4317 17.3325C14.2441 17.6848 14.0893 18.0535 13.9692 18.4341C13.6149 18.8537 12.8714 19.4954 11.6378 19.4954C11.2216 19.4999 10.809 19.4166 10.4271 19.251C10.0452 19.0853 9.70247 18.841 9.42134 18.5339C9.01753 18.1008 8.78899 17.618 8.71194 17.2624C8.80584 17.2336 8.89788 17.2047 8.98778 17.1755C9.0367 17.1596 9.0819 17.134 9.1207 17.1002C9.1595 17.0664 9.19109 17.0251 9.21359 16.9789H9.21364ZM1.96875 25.289V21.858C1.96875 19.1571 5.12285 18.275 7.65177 17.5662C7.75879 17.5362 7.86767 17.5066 7.9718 17.4773C8.24879 18.6409 9.49659 20.2608 11.6359 20.2608C12.369 20.2701 13.0888 20.065 13.707 19.6708C13.5607 20.9785 13.8112 22.3 14.4257 23.4635C15.0403 24.627 15.9906 25.5789 17.1531 26.1953H2.41478C2.17109 26.1953 1.96875 25.7081 1.96875 25.289ZM20.2251 26.1953C19.0794 26.1953 17.9595 25.8556 17.007 25.2191C16.0544 24.5826 15.312 23.6779 14.8735 22.6195C14.4351 21.561 14.3204 20.3964 14.5439 19.2727C14.7674 18.1491 15.3191 17.117 16.1292 16.3069C16.9393 15.4968 17.9714 14.9451 19.0951 14.7216C20.2187 14.4981 21.3834 14.6128 22.4418 15.0512C23.5002 15.4896 24.4049 16.2321 25.0414 17.1846C25.6779 18.1372 26.0176 19.2571 26.0176 20.4028C26.0159 21.9385 25.4051 23.4109 24.3191 24.4968C23.2332 25.5828 21.7608 26.1936 20.2251 26.1953V26.1953Z"
                fill="#F8F5F0"
              />
            </svg>

            <span>Patients</span>
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/ConsultationList"
            className={pathName === "/ConsultationList" ? "active" : ""}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.1875 23.1875H10.0625V24.0625H9.1875V23.1875Z"
                fill="#F8F5F0"
              />
              <path
                d="M9.1875 24.9375H10.0625V25.8125H9.1875V24.9375Z"
                fill="#F8F5F0"
              />
              <path
                d="M19.2688 14.4375C19.6652 14.4375 20.0384 14.2629 20.2917 13.9584L22.0802 11.8125H25.375C26.5812 11.8125 27.5625 10.8312 27.5625 9.625V5.25C27.5625 4.04381 26.5812 3.0625 25.375 3.0625H23.1875C23.1875 1.61481 22.0102 0.4375 20.5625 0.4375C19.1148 0.4375 17.9375 1.61481 17.9375 3.0625H15.75C14.5438 3.0625 13.5625 4.04381 13.5625 5.25V7.66544C12.7299 6.97681 11.6624 6.5625 10.5 6.5625H10.0625C8.61175 6.5625 7.22312 7.22969 6.31488 8.35581C4.93019 8.69006 3.9375 9.94044 3.9375 11.375C3.9375 12.8853 4.585 14.301 5.71112 15.2989C5.85769 16.6596 6.70075 17.8111 7.875 18.3969V19.341L4.82212 20.0594C2.24044 20.6666 0.4375 22.9434 0.4375 25.5955V27.5625H18.8125V25.5955C18.8125 24.7384 18.6217 23.9221 18.2801 23.1875H19.9198L21.7083 25.333C21.9616 25.6379 22.3348 25.8125 22.7312 25.8125C23.4653 25.8125 24.0625 25.2153 24.0625 24.4812V23.1875H25.375C26.5812 23.1875 27.5625 22.2062 27.5625 21V17.5C27.5625 16.2938 26.5812 15.3125 25.375 15.3125H16.625C15.4188 15.3125 14.4375 16.2938 14.4375 17.5V20.062C14.434 20.0611 14.4309 20.0598 14.4279 20.0594L11.375 19.341V18.3969C12.5492 17.8111 13.3923 16.6591 13.5389 15.2989C14.5552 14.3981 15.1769 13.1569 15.2884 11.8125H17.9375V13.1062C17.9375 13.8403 18.5347 14.4375 19.2688 14.4375ZM20.5625 1.3125C21.5276 1.3125 22.3125 2.09737 22.3125 3.0625C22.3125 4.02763 21.5276 4.8125 20.5625 4.8125C19.5974 4.8125 18.8125 4.02763 18.8125 3.0625C18.8125 2.09737 19.5974 1.3125 20.5625 1.3125ZM8.13444 20.1788L9.07812 21.4375L8.05919 22.7959L7.17806 20.4037L8.13444 20.1788ZM9.625 22.1664L10.8308 23.7738L9.75756 26.6875H9.49288L8.41969 23.7738L9.625 22.1664ZM1.3125 25.5955C1.3125 23.3511 2.83806 21.4248 5.02294 20.9108L6.31925 20.6058L8.56013 26.6875H4.8125V24.0625H3.9375V26.6875H1.3125V25.5955ZM15.3125 17.5C15.3125 16.7764 15.9014 16.1875 16.625 16.1875H25.375C26.0986 16.1875 26.6875 16.7764 26.6875 17.5V21C26.6875 21.7236 26.0986 22.3125 25.375 22.3125H23.1875V24.4812C23.1875 24.7327 22.9827 24.9375 22.7312 24.9375C22.5951 24.9375 22.4674 24.8776 22.3807 24.7734L20.3302 22.3125H17.7712C17.1636 21.4515 16.3196 20.7629 15.3125 20.3459V17.5ZM17.9375 25.5955V26.6875H15.3125V24.0625H14.4375V26.6875H10.6899L12.9303 20.6058L14.2266 20.9108C16.4119 21.4253 17.9375 23.3516 17.9375 25.5955ZM12.0724 20.4041L11.1912 22.7964L10.1719 21.4375L11.1156 20.1788L12.0724 20.4041ZM10.5 19.5418L9.625 20.7086L8.75 19.5418V18.711C9.03175 18.7753 9.324 18.8125 9.625 18.8125C9.926 18.8125 10.2183 18.7753 10.5 18.711V19.5418ZM12.6875 14.875C12.6875 16.5637 11.3133 17.9375 9.625 17.9375C7.93669 17.9375 6.5625 16.5637 6.5625 14.875V12.8201C6.5625 12.5055 6.818 12.25 7.13256 12.25C7.24544 12.25 7.35481 12.2832 7.44887 12.3458L8.61744 13.125H11.375C12.0986 13.125 12.6875 13.7139 12.6875 14.4375V14.875ZM13.5236 14.0508C13.3394 13.0292 12.4486 12.25 11.375 12.25H8.88256L7.93406 11.6178C7.69606 11.459 7.41869 11.375 7.13256 11.375C6.33544 11.375 5.6875 12.0229 5.6875 12.8201V13.9943C5.12575 13.2453 4.8125 12.3327 4.8125 11.375C4.8125 10.3154 5.56675 9.39531 6.60625 9.1875L6.81275 9.14594L6.9125 9.0125C7.65231 8.02638 8.83006 7.4375 10.0625 7.4375H10.5C12.6713 7.4375 14.4375 9.20413 14.4375 11.375C14.4375 12.3563 14.1116 13.2917 13.5236 14.0508ZM15.2902 10.9375C15.2123 10.0791 14.9078 9.28594 14.4375 8.61656V5.25C14.4375 4.52637 15.0264 3.9375 15.75 3.9375H18.0906C18.2586 4.41088 18.5574 4.82125 18.9455 5.12619C17.332 5.77063 16.1875 7.3465 16.1875 9.1875V10.0625H24.9375V9.1875C24.9375 7.3465 23.793 5.77063 22.1795 5.12619C22.5676 4.82125 22.8664 4.41088 23.0344 3.9375H25.375C26.0986 3.9375 26.6875 4.52637 26.6875 5.25V9.625C26.6875 10.3486 26.0986 10.9375 25.375 10.9375H21.6698L19.6188 13.3984C19.5326 13.5026 19.4049 13.5625 19.2688 13.5625C19.0173 13.5625 18.8125 13.3577 18.8125 13.1062V10.9375H15.2902ZM20.5625 5.6875C22.4923 5.6875 24.0625 7.25769 24.0625 9.1875H17.0625C17.0625 7.25769 18.6327 5.6875 20.5625 5.6875Z"
                fill="#F8F5F0"
              />
              <path
                d="M16.1875 17.0625H25.8125V17.9375H16.1875V17.0625Z"
                fill="#F8F5F0"
              />
              <path
                d="M16.1875 18.8125H25.8125V19.6875H16.1875V18.8125Z"
                fill="#F8F5F0"
              />
              <path
                d="M17.9375 20.5625H24.0625V21.4375H17.9375V20.5625Z"
                fill="#F8F5F0"
              />
              <path
                d="M24.9375 20.5625H25.8125V21.4375H24.9375V20.5625Z"
                fill="#F8F5F0"
              />
            </svg>

            <span>Consultations</span>
          </Link>
        </li>
        <li>
          <Link
            to="/AddPathology"
            className={pathName === "/AddPathology" ? "active" : ""}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.7662 17.1062C26.6844 16.8828 26.5575 16.6786 26.3934 16.5062C26.2293 16.3339 26.0316 16.1971 25.8125 16.1044V3.9375C25.8114 3.58972 25.6728 3.25649 25.4269 3.01057C25.181 2.76465 24.8477 2.62604 24.5 2.625H10.5C10.1522 2.62604 9.81894 2.76465 9.57303 3.01057C9.32711 3.25649 9.1885 3.58972 9.18746 3.9375V16.2006C8.69107 16.4263 8.21656 16.6972 7.76996 17.01L6.39621 17.9725L5.89308 17.255C5.82633 17.1606 5.72516 17.0963 5.61141 17.0758C5.49765 17.0554 5.3804 17.0804 5.28496 17.1456L0.984329 20.1556C0.889673 20.2232 0.825224 20.3251 0.804782 20.4396C0.78434 20.5541 0.809528 20.672 0.874954 20.7681L5.39433 27.2169C5.46057 27.3119 5.56179 27.3768 5.67578 27.3973C5.78978 27.4178 5.90726 27.3922 6.00246 27.3263L10.3031 24.3162C10.3976 24.2486 10.4619 24.1466 10.4823 24.0322C10.5027 23.9178 10.4777 23.8 10.4125 23.7038L10.1631 23.3494C11.0073 22.7726 12.0444 22.5511 13.0506 22.7325L13.8293 22.8637C14.8132 23.0385 15.8257 22.951 16.765 22.61L25.7206 19.3506C25.9367 19.272 26.1352 19.1516 26.3047 18.9962C26.4742 18.8408 26.6114 18.6536 26.7085 18.4451C26.8056 18.2367 26.8607 18.0112 26.8706 17.7814C26.8805 17.5517 26.845 17.3223 26.7662 17.1062ZM19.6875 3.5H24.5C24.616 3.5 24.7273 3.54609 24.8093 3.62814C24.8914 3.71019 24.9375 3.82147 24.9375 3.9375V5.25H19.6875V3.5ZM16.1875 3.5H18.8125V7.25813L17.8106 6.25187C17.728 6.16991 17.6163 6.12391 17.5 6.12391C17.3836 6.12391 17.2719 6.16991 17.1893 6.25187L16.1875 7.25813V3.5ZM10.0625 3.9375C10.0625 3.82147 10.1086 3.71019 10.1906 3.62814C10.2726 3.54609 10.3839 3.5 10.5 3.5H15.3125V5.25H10.0625V3.9375ZM10.0625 6.125H15.3125V8.3125C15.3121 8.39905 15.3378 8.4837 15.3862 8.55547C15.4345 8.62724 15.5034 8.68282 15.5837 8.715C15.6634 8.7485 15.7512 8.75766 15.8361 8.74131C15.9209 8.72495 15.9991 8.68383 16.0606 8.62312L17.5 7.17937L18.9393 8.62312C19.0221 8.70473 19.1337 8.75034 19.25 8.75C19.3074 8.75151 19.3643 8.73952 19.4162 8.715C19.4966 8.68282 19.5654 8.62724 19.6137 8.55547C19.6621 8.4837 19.6878 8.39905 19.6875 8.3125V6.125H24.9375V15.9731C24.7973 15.985 24.6591 16.0144 24.5262 16.0606L22.9775 16.625H19.9018C19.671 16.4279 19.3915 16.2965 19.0925 16.2444L14.6956 15.47C13.275 15.2187 11.8151 15.3057 10.4343 15.7237L10.3556 15.75C10.255 15.7762 10.1587 15.8156 10.0625 15.8506V6.125ZM5.85808 26.3594L1.8462 20.6237L5.42933 18.1125L9.44121 23.8481L5.85808 26.3594ZM25.9875 17.8587C25.9605 18.0101 25.8941 18.1516 25.795 18.2691C25.6959 18.3866 25.5677 18.4759 25.4231 18.5281L16.4675 21.7875C15.6724 22.0763 14.8152 22.1503 13.9825 22.0019L13.1993 21.8706C11.9653 21.6484 10.6935 21.922 9.65996 22.6319L6.89933 18.6856L8.27308 17.7275C8.98186 17.2269 9.76614 16.8429 10.5962 16.59L10.675 16.5681C11.9293 16.1876 13.2551 16.1052 14.5468 16.3275L18.9393 17.1019C19.169 17.1442 19.3731 17.2745 19.5081 17.465C19.5847 17.5776 19.6341 17.7064 19.6525 17.8412C19.6749 17.9637 19.6673 18.0898 19.6306 18.2087C19.5702 18.418 19.4344 18.5975 19.2492 18.7122C19.0641 18.827 18.843 18.869 18.6287 18.83L13.8993 17.9944L13.7506 18.8519L18.4756 19.6875C18.5778 19.7085 18.6819 19.7188 18.7862 19.7181C19.1629 19.7178 19.5295 19.5964 19.832 19.3719C20.1344 19.1474 20.3568 18.8317 20.4662 18.4713L24.8237 16.8831C25.0419 16.8043 25.2824 16.8154 25.4924 16.9138C25.7024 17.0122 25.8647 17.19 25.9437 17.4081C25.9997 17.5514 26.0149 17.7074 25.9875 17.8587Z"
                fill="#F8F5F0"
              />
            </svg>

            <span>Pathology</span>
          </Link>
        </li>
        <li>
          <Link
            to="/SubscriptionModel"
            className={pathName === "/SubscriptionModel" ? "active" : ""}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 23C18.9706 23 23 18.9707 23 14C23 9.02944 18.9707 4.99998 14 4.99998C9.02944 4.99998 4.99998 9.02944 4.99998 14C4.99998 18.9706 9.02944 23 14 23ZM14 24C19.5228 24 24 19.5228 24 14C24 8.47711 19.5228 4 14 4C8.47711 4 4 8.47711 4 14C4 19.5228 8.47711 24 14 24Z"
                fill="#F8F5F0"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 14C18 14.2761 17.7761 14.5 17.5 14.5H10.5C10.2238 14.5 10 14.2761 10 14C10 13.7239 10.2238 13.5 10.5 13.5H17.4999C17.7761 13.5 18 13.7239 18 14Z"
                fill="#F8F5F0"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 18C13.7239 18 13.5 17.7761 13.5 17.5V10.5C13.5 10.2238 13.7239 10 14 10C14.2761 10 14.5 10.2238 14.5 10.5V17.4999C14.5 17.7761 14.2761 18 14 18Z"
                fill="#F8F5F0"
              />
            </svg>

            <span>Subscription Model</span>
          </Link>
        </li>

        <li className="">
          <Link
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.645 23.2967H8.16769C6.67915 23.2967 5.47138 22.0845 5.47138 20.6004V7.39962C5.47138 5.91108 6.6836 4.70331 8.16769 4.70331H13.7341C14.0684 4.70331 14.3358 4.43591 14.3358 4.10166C14.3358 3.7674 14.0684 3.5 13.7341 3.5H8.16769C6.0151 3.5 4.26807 5.25149 4.26807 7.39962V20.6004C4.26807 22.753 6.01955 24.5 8.16769 24.5H13.645C13.9792 24.5 14.2466 24.2326 14.2466 23.8983C14.2466 23.5641 13.9748 23.2967 13.645 23.2967Z"
                fill="#F8F5F0"
              />
              <path
                d="M23.5559 13.5791L19.7321 9.75528C19.4959 9.51907 19.1171 9.51907 18.8808 9.75528C18.6446 9.99148 18.6446 10.3703 18.8808 10.6065L21.6797 13.4053H9.47275C9.1385 13.4053 8.87109 13.6727 8.87109 14.007C8.87109 14.3412 9.1385 14.6086 9.47275 14.6086H21.6797L18.8808 17.4074C18.6446 17.6436 18.6446 18.0225 18.8808 18.2587C18.9967 18.3745 19.1527 18.4369 19.3042 18.4369C19.4558 18.4369 19.6117 18.379 19.7276 18.2587L23.5515 14.4348C23.7921 14.1942 23.7921 13.8109 23.5559 13.5791Z"
                fill="#F8F5F0"
              />
            </svg>

            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default SideDrawer;
