// Save this as app/demo/alignment-test.tsx
export default function AlignmentTest() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Alignment Test Page</h1>
      
      {/* Test 1: Basic text-center */}
      <div className="bg-white p-6 mb-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Test 1: Basic text-center</h2>
        <p className="text-center bg-blue-100 p-4">
          This should be centered with just text-center
        </p>
      </div>

      {/* Test 2: Force center */}
      <div className="bg-white p-6 mb-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Test 2: Force center</h2>
        <p className="text-center-force bg-green-100 p-4">
          This uses text-center-force (nuclear option)
        </p>
      </div>

      {/* Test 3: Multiple utilities */}
      <div className="bg-white p-6 mb-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Test 3: Multiple utilities</h2>
        <p className="!text-center text-center text-center-force bg-purple-100 p-4">
          This uses ALL center classes (!text-center text-center text-center-force)
        </p>
      </div>

      {/* Test 4: Flex center */}
      <div className="bg-white p-6 mb-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Test 4: Flex center</h2>
        <div className="flex justify-center bg-yellow-100 p-4">
          <span>This uses flexbox centering</span>
        </div>
      </div>

      {/* Test 5: Your Hero Text */}
      <div className="bg-white p-6 mb-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Test 5: Hero Style</h2>
        <div className="!text-center text-center-force">
          <h1 className="text-6xl font-bold mb-4 mri-gradient-text">
            ReadMyMRI
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Medical Imaging Analysis
          </p>
        </div>
      </div>
    </div>
  );
}