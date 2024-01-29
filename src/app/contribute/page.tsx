/**
 * @file /app/contribute/page.tsx
 * @fileoverview page containing information on how to contribute to the 3D Digital Herbarium project.
 */

import Header from '@/components/Header/Header'
import Footer from '@/components/Shared/Foot'

const Contribute = () => {
  return (
    <>
      <Header headerTitle="contribute" pageRoute="collections" />
      <div className="h-[calc(100vh-177px)] pl-8">
        <br></br>
        <p>Thank you for considering contribution!</p>
        <br></br>
        <p>For financial contributions, contact Library Dean Cryil Oberlander at cyril.oberlander@humboldt.edu</p>
        <br></br>
        <p>For code contributions, visit our <a href='https://github.com/CPH3DH/3dHerbarium' rel='noopener noreferrer' target='_blank'>GitHub</a></p>
      </div>
      <Footer />
    </>
  )
}
export default Contribute;