import Image from 'next/image';
import styles from './header.module.scss';
import { BiSearch } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

import { MouseEventHandler } from 'react';
import { Button } from 'evergreen-ui';

const DEFAULT_LOGO =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQEhUTEBIWFRMXExUWFRYVGRgXFRgXGBUYFhYXFxUYHSggGBolGxUVITEhJSkrLi4uFx80OTQtOCgtLisBCgoKDg0OGxAQGy0lHyUtKy0tLS0uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAGsB1AMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUCAQj/xABDEAABAwEDCAUICQMEAwAAAAABAAIDBAYRIQUHEjFBUXGxMmFygZETIjM0QlKhwRQVFiNTYoKS0SRUshdDc6LC4fD/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADwRAAEDAgMFAwoFAgcAAAAAAAEAAgMEEQUhMRJBUXGRE2GBBhQiMzRSobHB0RYycuHwQlMVIyRDgpLx/9oADAMBAAIRAxEAPwC8URERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERFgqnEMcRrDSR4LOtes9G/sO5IvRqqhqLZVoc4CY4OI2b+Cx/bWu/GP8A1/hcOu6bu181ObKWMgqqdssheHEkXDVgVUs7R5sCeq7qpFHTRh8kbbZDJo+3cuF9ta78Y/8AX+F9Ftq78U9938Ka/wCnFL78niP4Xw5uKX35PEfwt3Yz8fioH+I4Z7g/6D7KMUmcOqZ0tF/EXclIclZxYnkCdhYTtGLe9atfm1w+4mx3PH8KF5YyFPSm6VhA2H2T3rwunjzP3WbIcMrBZlge70T0V40dYyZofG4OadoWwqJyBl+ajeHMdh7QPRIVx5CytHVxCSM9obQdylQziTLeqPEMMfSHaGbTv+hXTREW9ViIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiLk2mrHw00kkeDmi8LrLg229Sm7I5rB5s08lvpmh0zAdLj5qu/t5We+PBfPt7We+PBRcryqztZPeK7vzCm/tt6KVfb2s98eC+/b2s98eCi7Wk6gvvknbivO1f7xXnmFN/bb0UtizhVQ16J7l1KPOWSfvYRdvabj4FV5cvK9bPIN61vwukcLGMDlkrv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4OQqU4mnjv7IT6gpP7eP9oWPmbuK2jyhhAtsHqFw82h/pP1nkpetakpI4hoxsDBuaLgtlTY27LQFzlVMJpnSAWuboiIs1HREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREX/2Q==';

export const Header = () => {
  const handleCtaClick = (e?: MouseEventHandler<HTMLButtonElement>) => {};

  return (
    <div className={styles['ui-header-container']}>
      <div className={styles['ui-header-row']}>
        <header className={styles['ui-header']}>
          <div>
            {/* <Image src={logo || DEFAULT_LOGO} width="180" height="35" /> */}
          </div>
          <div className={styles['ui-header-right']}>
            <div className={styles['ui-header-search']}>
              <BiSearch size={22} />
              <p>Search</p>
            </div>
            <div className={styles['ui-header-place-ad']}>
              <Button
                appearance="primary"
                width={130}
                height={38}
                intent="success"
              >
                Place Ad
              </Button>
            </div>
            <div
              className={styles['ui-header-dropdown-wrapper ui-header-center']}
            >
              <Button
                className={styles['ui-header-profile-btn']}
                onClick={handleCtaClick}
                appearance="minimal"
              >
                <div className={styles['ui-header-center']}>
                  <FaRegUserCircle size={18} />
                </div>
                <span className="profile-name">Mduduzi</span>
                <IoMdArrowDropdown size={18} />
              </Button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
