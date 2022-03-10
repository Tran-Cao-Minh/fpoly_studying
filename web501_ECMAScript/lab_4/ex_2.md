# 2 explain the different of single and multiple async/await
- 1. Use single
- 2. Use multiple

The 1 is slower than 2 because JS have to wait the result
from every single axios.get to get the next result.

The 2 is faster because JS can get all axios.get at once
time, when all is finished it provide same result with 1