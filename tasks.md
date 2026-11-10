## Remaining Tasks to do tomorrow:
- Implement translating (moving left or right) the pieces using arrow keys. There might be below cases to handle:
  - Border cases, the piece should not go beyond borders
  - The piece should move only if it is not placed on ground
  - The left and right should only apply to those pieces which are floating (essentially the same)

- Correctly implementing the tetris block moving downward function. Currently it behaves like sandscapes. we need to move it according to pieces not block. So I guess we will need to take care of additional data such as center of piece. The moment ground touches most bottom piece or (row+1, col) then dont move the piece at all. Something like this. *This is priority task*

- Then up arrow will only rotate the piece in right. This is not that hard. Really simpler

- Removing the row if it is filled and then moving all those pieces downwards. This can be done at last. 

- Overall good progress. Not that much hard game, just need to deal with some array operations. And dont compare your progress with some imaginary dude who works 24/7. Work on your own. Focus on how to improve yourself first. 

- And off-course some code refactoring needs to be done. This can be done while coding or whenever we spot something 