import '../styles/Home.css'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className='container'>
        <main className='body'>
          <h1 className='txt-1'>Ayo Uji Kecerdasan Moral Anda!</h1>
          <Link to='/kuisioner'>
            <button className='btn-mulai'>Mulai</button>
          </Link>
        </main>
      </div>
    </>
  );
}

export default Home