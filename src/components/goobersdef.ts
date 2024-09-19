import mimi from "../assets/oc/mimi.gif";
// import b1 from "../assets/oc/b1.png";
// import b2 from "../assets/oc/b2.png";
import bb1 from "../assets/oc/bb1.png";
import bb2 from "../assets/oc/bb2.png";
import bin from "../assets/oc/bin.png";
import block from "../assets/oc/block.png";
import bomb from "../assets/oc/bomb.gif";
import book from "../assets/oc/book.png";
import box from "../assets/oc/box.png";
import bug from "../assets/oc/bug.gif";
import crow from "../assets/oc/crow.png";
import eg from "../assets/oc/eg.png";
import gb1 from "../assets/oc/gb1.png";
import gb2 from "../assets/oc/gb2.png";
import pb1 from "../assets/oc/pb1.png";
import pb2 from "../assets/oc/pb2.png";
// import r1 from "../assets/oc/r1.png";
// import r2 from "../assets/oc/r2.png";
import rat from "../assets/oc/rat.gif";
import yb1 from "../assets/oc/yb1.png";
import yb2 from "../assets/oc/yb2.png";

const t = {
  flip: "flip",
  big: "big",
  float: "float",
};

const goobers = [
  { files: [rat, bomb], tags: [t.flip] },
  {
    files: [bb1, yb1, gb1, pb1, bb2, yb2, gb2, pb2],
    tags: [t.flip],
  },
  { files: [bin, block, eg, bug], tags: [] },
  { files: [mimi, crow, box, book], tags: [t.flip] },
  { files: [mimi, crow], tags: [t.flip, t.float] },
  { files: [bug], tags: [t.float] },
  // { files: [], tags: [] }, // empty template item
];

export default goobers;
