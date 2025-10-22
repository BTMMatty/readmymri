export default function TestCenter() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-center">
          Centering Test
        </h1>
        <p className="text-xl text-center">
          If this is centered, we're good to go!
        </p>
        <div style={{ textAlign: 'center' }}>
          <p>Nuclear option with inline style</p>
        </div>
      </div>
    </div>
  );
}
