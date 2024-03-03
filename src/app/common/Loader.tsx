// components/Loader.js

const Loader = () => (
    <div style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      zIndex: 1000 // Ensure it's above everything
    }}>
      <div>Loading...</div> {/* Replace with your loader/spinner */}
    </div>
  );
  
  export default Loader;
  