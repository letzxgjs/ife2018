

### 创建仓库

#### 初始化
git init 

文件夹右键单击, git bash

#### git diff <file>
- `git diff <file> ` 
    - 工作区(work dict)和暂存区(stage)的比较
    - 确定git add的文件
- `git diff cached <file> `
    - 暂存区(stage)和分支(master)的比较
    - 确定是否git commit -m ''
- `git diff HEAD <file>` 工作区和版本库里面最新版本的区别

#### git add <file>

#### git commit
- `git commit -m "some description"`
- `git commit` 不带参数, 进入vim编辑模式
    - 创建、打开文件   `vi <file>`, i或insert键进入编辑
    - 保存文件   esc键 :wq
    - 放弃修改   esc键 :q! (|:e!)

#### git status
查看工作区变动


### 版本回退
- `git log`
    - `git log --pretty=oneline`  在一行内显示
    - `git log --graph --pretty=oneline --abbrev-commit` 查看分支合并情况
    - 查看版本历史记录
    - 其中由sha1产生的十六进制数字作commit id版本号
    - HEAD表示当前最新版本, HEAD^表示上一个版本, HEAD^^, HEAD100
- `git reset`      移动HEAD指针
    - `git reset --hard HEAD`
    - `git reset --hard 'commit id'`
    - `git reflog` 记录每次命令, 记录HEAD id
### 工作区、暂存区、本地仓库(.git文件夹)、远程仓库
- 工作区 本地文件夹
- ~~暂存区 git add 提交的文件~~ <font color="red">应是所有没有git add的文件</font>
- 本地仓库 HEAD指针指向这里, git commit提交更新到此处

1. add 把本地文件添加到stage(also index)
2. commit 把stage里的文件全提交到当前HEAD中

![工作区、暂存区、仓库关系](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907702917346729e9afbf4127b6dfbae9207af016000/0)


### git管理的是<font color=blue>修改</font>
管理git add到暂存区并且git commit 到仓库的修改

`git diff HEAD <file>` 工作区和版本库里面最新版本的区别

### 撤销修改
- 文件还没git add --> `git checkout -- <file>` **文件在工作区的修改全部撤销**
- 已经add, 未commit --> `git reset HEAD <file>` **把暂存区的修改撤销掉（unstage），重新放回工作区**
    - 多个文件, `git reset [HEAD]`
- 已经commit --> `git reset --hard HEAD`

### 删除文件
- `git rm <file>` 删除文件, 
- `git checkout -- <file>` 从仓库恢复. **但不能恢复最后一次提交后再修改的内容**


### 远程仓库

- 创建远程仓库
    + 创建SSH key:
    `ssh-keygen -t rsa -C "youremail@example.com"`
    + 关联远程仓库和本地仓库:
    `git remote add origin git@github.com:username/repo`
    + 查看当前的origin
    `git branch -a`
    + 第一次推送
    `git push -u origin master`
    + 推送内容到远程仓库
    `git push origin master`  
    `git push origin someBranch1`
    + 删除远程分支
    `git push origin :someBranch1`
    <img src="远程分支添加、删除.PNG">
- 克隆远程仓库 (默认仅master分支)
    + `git clone ssh://example.com/path/to/repo.git`
    + `git clone [user@]example.com:path/to/repo.git` (ssh)
    + `git clone http[s]://example.com/path/to/repo.git`
    + `git clone http://git.oschina.net/yiibai/sample.git`
    + `git clone git://example.com/path/to/repo.git`
    + `git clone /opt/git/project.git`
    + `git clone file:///opt/git/project.git`
    + `git clone ftp[s]://example.com/path/to/repo.git`
    + `git clone rsync://example.com/path/to/repo.git`

参考[易百教程](http://www.ituring.com.cn/article/504)


## <font color="red">分支管理</font>
### 创建合并分支
- ##### master指向最新提交, head指向maste

![master指向最新提交, head指向master](https://cdn.liaoxuefeng.com/cdn/files/attachments/0013849087937492135fbf4bbd24dfcbc18349a8a59d36d000/0)

- ##### 新建分支dev时 (创建dev指针指向master相同的提交, 再把head指向dev, 表示当前分支中dev上)#####

<font color="red">※工作区文件没有变</font>

`$ git checkout -b dev`
等效于
```
$ git branch dev
$ git checkout dev #指针移动
```
> 
- 使用checkout从分支dev切换回master的时候，git会对比dev的最新提交与master的最新提交，将dev最新提交相对于master最新提交的修改从工作区和暂存区中撤销，所以
- 如果在dev分支中修改了文件并提交了，那么切换回master的时候，工作区和暂存区的文件保持master最新提交时的状态，
- 而如果在dev分支中修改了文件但没有提交，那么dev最新提交相对于master最新提交就没有做任何修改，在切换回master分支的时候，工作区和暂存区的文件就保留了在dev分支中的修改，与master最新提交的文件状态不一致，这也是使用`git stash`的背景。

`git branch` 查看当前本地仓库有哪些分支
`git branch -a` 查看当前所有分支, 包含远程分支

![新建dev分支](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384908811773187a597e2d844eefb11f5cf5d56135ca000/0)

- ##### 合并分支
    + Fast-forward快进模式(dev新提交, dev指针移动, 合并时把master指针指向dev的当前提交)※不知道是否合并过

    `$ git merge dev` 把dev分支合并到当前分支亦即master

    ![合并分支](https://cdn.liaoxuefeng.com/cdn/files/attachments/00138490883510324231a837e5d4aee844d3e4692ba50f5000/0)
    
    + 新建fea分支, 修改readme.txt*并提交*; 回到master分支, 修改readme.txt*并提交*
    
    ![冲突](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384909115478645b93e2b5ae4dc78da049a0d1704a41000/0)
    ```
    cat readme.txt #查看冲突
    git add readme.txt
    git commit -m 'fix conflict'
    git log --graph --pretty=oneline --abbrev-commit #查看分支合并情况
    ```
    <font color="red">**※master再新提交一次**</font>

    `git merge --no-ff -m 'msg'`

    ![解决冲突](https://cdn.liaoxuefeng.com/cdn/files/attachments/00138490913052149c4b2cd9702422aa387ac024943921b000/0)

- ##### 删除分支
`$ git branch -d dev` 删除dev分支


>把分支想象成RPG游戏的第二个存档，更多分支就是第三第四个存档
这些存档多数都是用来做master第一个存档不敢做的事情
在这些分支存档上做的事情不会影响第一个master存档

>孙悟空分身, 猫9条命, 伏地魔


### 分支管理
![分支策略](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384909239390d355eb07d9d64305b6322aaf4edac1e3000/0)
<img src="分支策略.PNG">

### bug分支
1. `git stash` 把当前工作现场“储藏”起来，等以后恢复现场后继续工作
    - 新文件须`git add` 后才能`git stash `
2. 在master上创建临时分支, 修复bug, 合并并删除bug分支
3. ` git stash list` 查看工作列表 (`stash@{0}: WIP on dev: f52c633 add merge`)
4. 恢复
    - 
    ```
    git stash apply stash@{0}
    git stash drop #删除stash list
    ```
    - `git stash pop`

##### ※奇怪的地方
1. git stash pop在任意分支上都可以用, 而且会出现窃取
2. 


### 删除分支 

- `git branch -d someBranch1` 
- `git branch -D someBranch1` 未合并的分支, git会提醒


### 多人协作 
远程仓库上的默认名称是origin
远程仓库上的默认名称是origin
`git remote` origin

`git remote -v` 

origin  git@github.com:michaelliao/learngit.git (fetch)

origin  git@github.com:michaelliao/learngit.git (push)
(!没有权限时见不到push)

推送分支
- `git push origin master ` 推送主分支
- `git push origin other2`  推送其他分支

+ master分支需要时刻与远程仓库的master同步
+ dev分支需要时刻与远程仓库的dev同步
+ bug分支、feature分支不需要

#### 实战
1. 从远程仓库clone时默认只克隆master分支
2. `git checkout -b dev origin/dev` 从远程仓库clone dev分支
3. ~~git branch --set-upstream-to=origin/dev dev 设置远程分支与本地分支链接~~
4. 推送到远程仓库dev分支冲突时, 先git pull origin dev
5. 解决冲突, 再git commit -m 'no conflict', 再git push origin dev

<img src="关联本地分支与远程分支.PNG">


### git rebase

### 标签 ###
和commit相似, 也是仓库的快照, 但标签指向的某个commit指针不能移动

- 创建标签 `git tag <tagname> [可选commit id]` 默认是最新提交的commit id(即HEAD)
    - `git tag -a <tagname> -m "blablabla..."` 指定标签信息
    - `git show <tagname>`
    - `git tag` 查看所有标签(并不按先后创建顺序)

- 操作标签
    - `git tag -d <tagName>` 删除
    - `git push origin <tagname>` 推送到远程
    - `git push origin --tags` 一次性推送所有标签
    - 
```
## 删除远程上的标签
git tag -d <tagName>
git push origin :refs/tags/<tagName>
```



### 使用Github

<img src="使用Github.png">


### 自定义Git
- 忽略文件

- 配置命令别名
    + `git config --system ` 全局配置
    + `cat .gitconfig` 用户配置文件(在c:\users\username目录下)
    + `cat .git/config` 仓库的Git配置文件

```
git config --global alias.unstage 'reset HEAD'
git config --global alias.last 'log -1' #最后一次提交信息
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

git config --global --unset alias.ci #删除别名ci
```











### git常见conflic
- `error: you need to resolve your current index first`

>Try this if you don't want any of the merges listed in git status:
`git reset --merge`

>This resets the index and updates the files in the working tree that are different between <commit> and HEAD, but keeps those which are different between the index and working tree (i.e. which have changes which have not been added).
If a file that is different between <commit> and the index has unstaged changes -- reset is aborted.
More about this - https://git-scm.com/docs/git-reset

- `both modified`

>if there were conflicts produced by a merge. git isn't letting you change branch until you've resolved these conflicts. If you edit that file, you should see some conflict markers in it - there's a guide to resolving those conflicts in the git manual. (Since kernel.org is currently down, you can find that guide here instead.)

>Alternatively, if you think the merge was a mistake, you could undo it with: `git reset --merge`
