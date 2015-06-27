Template.appBody.helpers
    transitionOptions: ->
        return (from,to,node)->
            if to.initiator is 'menu'
                'none'
            else
                'right-to-left'
    transition:->
        return (from,to,element)->
            'iron-router'
    title:->
        Session.get 'account_search_term'

Template.appBody.events
    'click .edit-button': ->
        Session.set 'current_task','edit'
        toggleSession 'global_edit'

    'click .new-button': ->
        Session.set 'current_task','new'
        Session.set 'selected_user', 'newuser'
        Session.set 'global_edit', true
        Session.set 'show_create_user_button', true

    'click .delete-button': ->
        if(Session.get('selected_user') != ('' || 'newuser'))
            Session.set 'current_task','delete'

    'click .view-button': ->
        Session.set 'current_task','view'
