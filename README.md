# CODESIGN2.github.io

These are the public-source files for the CODESIGN2 hybrid-Jekyll website. ***congratulations, you can use git / github if you can find this***

## Requirements

* Git
* Jekyll (currently using v3)
* Hosting.

## Use

```
git clone https://github.com/CODESIGN2/CODESIGN2.github.io
cd CODESIGN2.github.io
git pull
git checkout jekyll
jekyll serve --watch
```

***DO NOT POST THIS TO ANY WEBSITE WITH THE CODESIGN2 LOGO, THE NAME CODESIGN2, OR THE SITE COPY***

## About 

The main differences between this and many Jekyll projects you will see is the use of _content collection for repeatable content blocks. The syntax for the includes for this repo has been adjusted for Jekyll 3, and may be subjet to revision in newer Jekyll versions. 

The reason this is not being used to generate on gh-pages is we have plugins we cannot use on github-pages, but; the plugins work fine when generated on local machines, and then the source and output can be updated separately.

This is not a live copy of what is on the CODESIGN2 website. There are other scripts that go towards running that, some of which contain sensetive data.

This also requires PHP files not released with this repo for some of the TwiML and messaging functionality to work. Partially this is because it shouldn't matter what those files look like, partially it's because the files we have only work with our cloud-init setup which is known to contain sensetive data.

 > All theme code within this repository is to be considered to be GPL-Licensed unless specific-licensing exists, or the work is part of a third-party such as jQuery.
 
Of particular interest may be the serviceworker implementation. If you've tried serviceworker and Google analytics have been broken, or you can no longer post to forms on your site and elsewhere, this contains solutions for both by checking the request method is 'GET', and that the request destination is the same as the origin site for all `sw.js` handling.

## Feedback

While we don't accept contributions, we certainly do accept suggestions.
