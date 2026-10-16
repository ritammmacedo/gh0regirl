import { NavLink } from "react-router";

function Footer() {
    
    return(
        <>
        <div className="mt-16 mb-4">
            <ul className='text-center text-xs'>
                <li className='inline mr-4'><NavLink to="/">Data Privacy</NavLink></li>
                <li className='inline mr-4'><NavLink to="/contact">Terms of Use</NavLink></li>
                <li className='inline mr-4'>Copyright - 2026</li>
            </ul>
        </div>
        </>
    )
}

export default Footer;