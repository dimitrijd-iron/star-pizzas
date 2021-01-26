"use strict";

// Helper function used to create DOM elements out of a string
function buildDom(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  const result = tempDiv.children[0];
  return result;
}

// Helper function draws rotated img
// Credit: https://stackoverflow.com/a/50052594
function drawImageRotated(ctx, img, x, y, scale, rot) {
  ctx.setTransform(scale, 0, 0, scale, x, y);
  ctx.rotate(rot);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// Helper function returns square of euclidean distance
function calcDist2(centerX, centerY, objX, objY) {
  return (centerX - objX) ** 2 + (centerY - objY) ** 2;
}

// Helper function returns collision boolean
// expected obj{0,''}.x .y. size
function didCollide(obj0, obj) {
  const centerX = obj0.x + obj0.size / 2;
  const centerY = obj0.y + obj0.size / 2;
  const objX = obj.x + obj.size / 2;
  const objY = obj.y + obj.size / 2;
  const minDist2 = (obj0.size / 2 + obj.size / 2) ** 2;
  if (calcDist2(centerX, centerY, objX, objY) < minDist2) return true;
  return false;
}

// helper function to generate an entry vector for goodies & baddies
function randomEntryTensor(game) {
  // console.log(game);
  const ray = Math.max(game.canvas.width, game.canvas.width) / 2 + 150;
  const canvasCenterX = game.canvas.width / 2;
  const canvasCenterY = game.canvas.height / 2;
  const entryAngle = Math.random() * 2 * Math.PI;
  const entryPointX = canvasCenterX + Math.sin(entryAngle) * ray;
  const entryPointY = canvasCenterY + Math.cos(entryAngle) * ray;
  const entrySpeedX = (Math.random() * 2 - 1) * 3;
  const entrySpeedY = (Math.random() * 2 - 1) * 3;
  return {
    x: entryPointX,
    y: entryPointY,
    speedX: entrySpeedX,
    speedY: entrySpeedY,
  };
}
