;; see https://yarnpkg.com/getting-started/editor-sdks
((nil
  . ((eval . (let* ((project-directory (car (dir-locals-find-file default-directory)))
                    (tsserver-path (concat project-directory ".yarn/sdks/typescript/bin/tsserver")))
               (setq lsp-clients-typescript-server-args
                     `("--tsserver-path" ,tsserver-path "--stdio"))
               (setq flycheck-javascript-eslint-executable
                     (concat project-directory "bin/eslint"))
               (setq tide-tsserver-executable tsserver-path))))))
