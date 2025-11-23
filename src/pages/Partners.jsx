import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';
import TotalNumbersCard from '../components/dashboard/cards/TotalNumbersCard';

const Partners = () => {

    return (
        <div className="min-h-screen bg-white dark:bg-[#00000e] transition-colors">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="min-h-screen py-8 p-5 md:px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Partners</h1>
                    </div>

                    <TotalNumbersCard/>
                </div>
            </div>
        </div>
    );
};

export default Partners;
