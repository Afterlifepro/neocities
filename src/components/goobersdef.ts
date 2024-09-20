import mimi from "../assets/oc/goobers/mimi.gif";
// import b1 from "../assets/oc/goobers/b1.png";
// import b2 from "../assets/oc/goobers/b2.png";
import bb1 from "../assets/oc/goobers/bb1.png";
import bb2 from "../assets/oc/goobers/bb2.png";
import bin from "../assets/oc/goobers/bin.png";
import block from "../assets/oc/goobers/block.png";
import bomb from "../assets/oc/goobers/bomb.gif";
import book from "../assets/oc/goobers/book.png";
import box from "../assets/oc/goobers/box.png";
import bug from "../assets/oc/goobers/bug.gif";
import crow from "../assets/oc/goobers/crow.png";
import eg from "../assets/oc/goobers/eg.png";
import gb1 from "../assets/oc/goobers/gb1.png";
import gb2 from "../assets/oc/goobers/gb2.png";
import pb1 from "../assets/oc/goobers/pb1.png";
import pb2 from "../assets/oc/goobers/pb2.png";
// import r1 from "../assets/oc/goobers/r1.png";
// import r2 from "../assets/oc/goobers/r2.png";
import rat from "../assets/oc/goobers/rat.gif";
import yb1 from "../assets/oc/goobers/yb1.png";
import yb2 from "../assets/oc/goobers/yb2.png";

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
