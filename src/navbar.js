import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <div className='header-left'>
                <div className='header-logo, header-item'><h2>SampleApp</h2></div>
                <div className='header-navitem'><h4 className='header-item'>Home</h4></div>
                <div className='dropdown, header-navitem'>
                    <h4 className='header-item'>Projects</h4>
                    <div class="dropdown-content">
                        <p>Hello World!</p>
                    </div>
                </div>
                <div className='header-navitem'><h4 className='header-item'>About</h4></div>

            </div>
            <div className='header-right'>
                <div className='header-user-logo'>
                    hd
                </div>
                <div className='header-user-info'>
                    <div className='header-username'><h5>Dr. Heinz Doofenshmirtz</h5></div>
                    <div className='header-userjob'>Reasearcher</div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
