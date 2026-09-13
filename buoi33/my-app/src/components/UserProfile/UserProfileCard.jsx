import UserSkillBadge from './UserSkillBadge';

export default function UserProfileCard({ user }) {
  const isOnline = user.age > 25;
  
  // Tạo mảng thông tin từ các field có thật
  const skills = [user.role, user.gender, user.bloodGroup, user.company?.department].filter(Boolean);

  const handleContact = () => {
    alert(`Đang kết nối với ${user.firstName} qua email ${user.email}...`);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transform transition-all hover:shadow-2xl">
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      <div className="relative px-6 pb-6">
        <div className="flex justify-center -mt-16 mb-4">
          <div className="relative">
            <img 
              src={user.image} 
              alt={`${user.firstName} ${user.lastName}`} 
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg bg-white"
            />
            <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white shadow-sm ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{user.firstName} {user.lastName}</h2>
          <p className="text-sm text-gray-500 mt-1">{user.company?.title} - {user.company?.name}</p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-xs font-medium text-gray-600">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Thông tin & Vai trò</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <UserSkillBadge key={index} skill={skill} />
            ))}
          </div>
        </div>

        <button 
          onClick={handleContact}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors focus:ring-4 focus:ring-indigo-100"
        >
          Liên hệ
        </button>
      </div>
    </div>
  );
}
