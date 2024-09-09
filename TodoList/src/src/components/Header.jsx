import './Header.css';
import { memo } from 'react';

function Header(){
    return (
        <div className='Header'>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
}

export default memo(Header); // memo는 컴포넌트를 받아 최적화된 컴포넌트로 반환